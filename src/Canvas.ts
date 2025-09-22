import DrawingVertex from './DrawingVertex';
import DrawingEdge from './DrawingEdge';
import Embedder from './Embedder';
import Graph from './Graph';
import Point from './Point';

export default class Canvas {
    private static _drawingGraph: Graph<DrawingVertex>;
    private static readonly _edgeMap = new Map<DrawingVertex, Map<DrawingVertex, DrawingEdge>>();

    private static _pointerDown: boolean = false;
    private static delta: DOMPointReadOnly = new DOMPointReadOnly(0, 0);

    private static setViewBox(): void {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        if (canvas.getAttribute('viewBox')) {
            return;
        }
        canvas.setAttribute('viewBox', `0 0 ${Canvas.width} ${Canvas.height}`);
        canvas.addEventListener('pointerdown', Canvas.onPointerDown); // Pointer is pressed
        canvas.addEventListener('pointerup', Canvas.onPointerUp); // Releasing the pointer
        canvas.addEventListener('pointerleave', Canvas.onPointerUp); // Pointer gets out of the SVG area
        canvas.addEventListener('pointermove', Canvas.onPointerMove); // Pointer is moving
        canvas.addEventListener('wheel', Canvas.onScroll); // Scrolling the canvas
    }

    private static getSvgPoint(
        event: PointerEvent | WheelEvent
    ): DOMPointReadOnly {
        try {
            const canvas = document.getElementById('svg');
            const cursorPosition = new DOMPointReadOnly(
                event.clientX,
                event.clientY
            );
            if (!(canvas instanceof SVGSVGElement)) {
                throw new Error('Canvas element is not an SVGSVGElement');
            }
            return cursorPosition.matrixTransform(
                canvas.getScreenCTM()?.inverse()
            );
        } catch (error) {
            throw new Error(`Error getting SVG point: ${error}`);
        }
    }

    private static onPointerDown(event: PointerEvent): void {
        Canvas._pointerDown = true;
        Canvas.delta = Canvas.getSvgPoint(event);
    }

    private static onPointerUp(): void {
        Canvas._pointerDown = false;
    }

    private static onPointerMove(event: PointerEvent): void {
        try {
            if (!Canvas._pointerDown) {
                return;
            }

            event.preventDefault();

            const position = Canvas.getSvgPoint(event);
            const directionX = position.x - Canvas.delta.x;
            const directionY = position.y - Canvas.delta.y;
            Canvas.viewBox.x -= directionX;
            Canvas.viewBox.y -= directionY;
        } catch (error) {
            console.error('Error handling pointer move event:', error);
        }
    }

    private static onScroll(event: WheelEvent): void {
        try {
            event.preventDefault();

            const cursorPosition = Canvas.getSvgPoint(event);
            const factor = 1.05;
            const zoomFactor = event.deltaY < 0 ? factor : 1 / factor;

            Canvas.viewBox.x =
                cursorPosition.x -
                (cursorPosition.x - Canvas.viewBox.x) * zoomFactor;
            Canvas.viewBox.y =
                cursorPosition.y -
                (cursorPosition.y - Canvas.viewBox.y) * zoomFactor;
            Canvas.viewBox.width *= zoomFactor;
            Canvas.viewBox.height *= zoomFactor;
        } catch (error) {
            console.error('Error handling scroll event:', error);
        }
    }

    private static getDrawingEdge(
        vertexA: DrawingVertex,
        vertexB: DrawingVertex
    ): DrawingEdge {
        const map = Canvas._edgeMap.get(vertexA);
        if (undefined === map) {
            throw new Error(`No edge map found for point ${vertexA.toString()}`);
        }
        const line = map.get(vertexB);
        if (undefined === line) {
            throw new Error(
                `No line found for edge from ${vertexA.toString()} to ${vertexB.toString()}`
            );
        }
        return line;
    }

    private static drawEdge(vertexA: DrawingVertex, vertexB: DrawingVertex): void {
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
            const line = Canvas.getDrawingEdge(vertexA, vertexB);
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

    private static animate(): void {
        Canvas._drawingGraph = Embedder.embed(Canvas._drawingGraph);

        Canvas._drawingGraph.edges.forEach((edge) => {
            Canvas.drawEdge(edge[0], edge[1]);
        });

        requestAnimationFrame(Canvas.animate);
    }

    public static addDrawing(drawing: SVGElement): void {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error(`Canvas element with id "svg" not found`);
        }
        canvas.appendChild(drawing);
    }

    public static removeDrawing(drawing: SVGElement): void {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.removeChild(drawing);
    }

    private static createDrawingVertexGraph(
        graph: Graph<string>
    ): Graph<DrawingVertex> {
        const drawingGraph = new Graph<DrawingVertex>();
        const drawingMap = new Map<string, DrawingVertex>();

        graph.vertices.forEach((vertex) => {
            const randomPosition = new Point(Canvas.width * Math.random(), Canvas.height * Math.random());
            const drawing = new DrawingVertex(randomPosition.x, randomPosition.y, vertex);
            drawingGraph.insertVertex(drawing);
            drawingMap.set(vertex, drawing);
        });

        graph.edges.forEach((edge) => {
            const vertexA = drawingMap.get(edge[0]);
            const vertexB = drawingMap.get(edge[1]);
            if (undefined === vertexA || undefined === vertexB) {
                throw new Error(`Edge ${edge} contains undefined points`);
            }
            drawingGraph.insertDirectedEdge(vertexA, vertexB);
        });

        return drawingGraph;
    }

    public static draw(graph: Graph<string>): void {
        Canvas.setViewBox();

        Canvas._drawingGraph = Canvas.createDrawingVertexGraph(graph);

        Canvas._drawingGraph.edges.forEach((edge) => {
            if (Canvas._edgeMap.has(edge[0])) {
                return; // Edge already exists
            }
            const vertex = edge[0];
            const neighbors = Canvas._drawingGraph.getAdjacentVertices(vertex);
            const neighborsMap = new Map<DrawingVertex, DrawingEdge>();
            neighbors.forEach((neighbor) => {
                const line = new DrawingEdge(vertex.position, neighbor.position);
                line.stroke = 'black';
                Canvas.addDrawing(line.svg);
                neighborsMap.set(neighbor, line);
            });
            Canvas._edgeMap.set(vertex, neighborsMap);
        });

        Canvas.animate();
    }

    public static get height(): number {
        return window.innerHeight;
    }

    public static get width(): number {
        return window.innerWidth;
    }

    public static get center(): Point {
        return new Point(Canvas.width / 2, Canvas.height / 2);
    }

    private static get viewBox(): SVGRect {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        if (canvas instanceof SVGSVGElement) {
            return canvas.viewBox.baseVal;
        }
        throw new Error('Canvas element is not an SVGSVGElement');
    }
}
