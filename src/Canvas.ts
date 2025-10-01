import DrawingVertex from './DrawingVertex';
import DrawingEdge from './DrawingEdge';
import Embedder from './Embedder';
import Graph from './Graph';
import Point from './Point';

export default class Canvas {
    private static _instance: Canvas;

    private readonly _canvas: HTMLElement;
    private readonly _viewBox!: SVGRect;
    private readonly _drawingEdges = new Map<DrawingVertex, Map<DrawingVertex, DrawingEdge>>();
    private _graph!: Graph<DrawingVertex>;
    private _domPoint: DOMPointReadOnly = new DOMPointReadOnly(0, 0);
    private _pointerDown: boolean = false;

    private constructor() {
        this._canvas = document.getElementById('svg') as HTMLElement;
        if (null === this._canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        this._canvas.setAttribute(
            'viewBox',
            `0 0 ${this.width} ${this.height}`
        );
        if (this._canvas instanceof SVGSVGElement) {
            this._viewBox = this._canvas.viewBox.baseVal;
        }

        // Events
        this._canvas.addEventListener(
            'pointerdown',
            this.onPointerDown.bind(this)
        );
        this._canvas.addEventListener('pointerup', this.onPointerUp.bind(this));
        this._canvas.addEventListener(
            'pointerleave',
            this.onPointerUp.bind(this)
        );
        this._canvas.addEventListener(
            'pointermove',
            this.onPointerMove.bind(this)
        );
        this._canvas.addEventListener('wheel', this.onScroll.bind(this), {
            passive: false,
        });
    }

    private getDomPoint(event: PointerEvent | WheelEvent): DOMPointReadOnly {
        try {
            const cursorPosition = new DOMPointReadOnly(
                event.clientX,
                event.clientY
            );
            if (!(this._canvas instanceof SVGSVGElement)) {
                throw new Error('Canvas is not an SVGSVGElement');
            }
            return cursorPosition.matrixTransform(
                this._canvas.getScreenCTM()?.inverse()
            );
        } catch (error) {
            throw new Error(`Error getting SVG point: ${error}`);
        }
    }

    private onPointerDown(event: PointerEvent): void {
        this._pointerDown = true;
        this._domPoint = this.getDomPoint(event);
    }

    private onPointerUp(): void {
        this._pointerDown = false;
    }

    private onPointerMove(event: PointerEvent): void {
        if (false === this._pointerDown) {
            return;
        }

        event.preventDefault();

        const position = this.getDomPoint(event);
        const directionX = position.x - this._domPoint.x;
        const directionY = position.y - this._domPoint.y;
        this._viewBox.x -= directionX;
        this._viewBox.y -= directionY;
    }

    private onScroll(event: WheelEvent): void {
        event.preventDefault();

        const cursorPosition = this.getDomPoint(event);
        const factor = 1.05;
        const zoomFactor = event.deltaY < 0 ? factor : 1 / factor;

        this._viewBox.x =
            cursorPosition.x -
            (cursorPosition.x - this._viewBox.x) * zoomFactor;
        this._viewBox.y =
            cursorPosition.y -
            (cursorPosition.y - this._viewBox.y) * zoomFactor;
        this._viewBox.width *= zoomFactor;
        this._viewBox.height *= zoomFactor;
    }

    private getDrawingEdge(
        vertexA: DrawingVertex,
        vertexB: DrawingVertex
    ): DrawingEdge {
        const map = this._drawingEdges.get(vertexA);
        if (undefined === map) {
            throw new Error(
                `No edge map found for point ${vertexA.toString()}`
            );
        }
        const line = map.get(vertexB);
        if (undefined === line) {
            throw new Error(
                `No line found for edge from ${vertexA.toString()} to ${vertexB.toString()}`
            );
        }
        return line;
    }

    private drawEdge(vertexA: DrawingVertex, vertexB: DrawingVertex): void {
        try {
            const dividendX =
                vertexA.left * vertexB.left - vertexA.right * vertexB.right;
            const divisorX =
                vertexA.left + vertexB.left - (vertexA.right + vertexB.right);
            const x = dividendX / divisorX;

            const dividendY =
                vertexA.top * vertexB.top - vertexA.bottom * vertexB.bottom;
            const divisorY =
                vertexA.top + vertexB.top - (vertexA.bottom + vertexB.bottom);
            const y = dividendY / divisorY;

            const optimalPoint = new Point(x, y);
            const line = this.getDrawingEdge(vertexA, vertexB);
            const anchorA = optimalPoint.copy();
            const anchorB = optimalPoint.copy();

            if (vertexA.right < vertexB.left) {
                anchorA.x = vertexA.right;
                anchorB.x = vertexB.left;
            } else if (vertexA.left > vertexB.right) {
                anchorA.x = vertexA.left;
                anchorB.x = vertexB.right;
            }

            if (vertexA.top > vertexB.bottom) {
                anchorA.y = vertexA.top;
                anchorB.y = vertexB.bottom;
            } else if (vertexA.bottom < vertexB.top) {
                anchorA.y = vertexA.bottom;
                anchorB.y = vertexB.top;
            }

            line.pointA = anchorA;
            line.pointB = anchorB;
        } catch (error) {
            console.error(
                `Error drawing edge from ${vertexA.toString()} to ${vertexB.toString()}:`,
                error
            );
        }
    }

    private animate(): void {
        this._graph = Embedder.embed(this._graph);

        this._graph.edges.forEach((edge) => {
            this.drawEdge(edge[0], edge[1]);
        });

        requestAnimationFrame(this.animate.bind(this));
    }

    public static getInstance(): Canvas {
        if (!Canvas._instance) {
            Canvas._instance = new Canvas();
        }
        return Canvas._instance;
    }

    public addDrawing(drawing: SVGElement): void {
        this._canvas.appendChild(drawing);
    }

    public removeDrawing(drawing: SVGElement): void {
        this._canvas.removeChild(drawing);
    }

    public draw(graph: Graph<DrawingVertex>): void {
        this._graph = graph;
        this._graph.edges.forEach((edge) => {
            const vertexA = edge[0];
            if (this._drawingEdges.has(vertexA)) {
                return; // skip
            }
            const secondLevelMap = new Map<DrawingVertex, DrawingEdge>();
            const neighbors = this._graph.getAdjacentVertices(vertexA);
            neighbors.forEach((vertexB) => {
                const edge = new DrawingEdge(
                    vertexA.position,
                    vertexB.position
                );
                this.addDrawing(edge.svg);
                secondLevelMap.set(vertexB, edge);
            });
            this._drawingEdges.set(vertexA, secondLevelMap);
        });

        this.animate();
    }

    public get height(): number {
        return window.innerHeight;
    }

    public get width(): number {
        return window.innerWidth;
    }

    public get center(): Point {
        return new Point(this.width / 2, this.height / 2);
    }
}
