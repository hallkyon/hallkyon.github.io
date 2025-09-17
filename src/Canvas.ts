import DrawingVertex from './DrawingVertex';
import DrawingLine from './DrawingLine';
import Embedder from './Embedder';
import Graph from './Graph';
import Point from './Point';

export default class Canvas {
    private static _drawingGraph: Graph<DrawingVertex>;
    private static readonly _edgeMap: Map<
        DrawingVertex,
        Map<DrawingVertex, DrawingLine>
    > = new Map<DrawingVertex, Map<DrawingVertex, DrawingLine>>();

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

    private static getEdgeDrawing(
        rectA: DrawingVertex,
        rectB: DrawingVertex
    ): DrawingLine {
        const map = Canvas._edgeMap.get(rectA);
        if (undefined === map) {
            throw new Error(`No edge map found for point ${rectA.toString()}`);
        }
        const line = map.get(rectB);
        if (undefined === line) {
            throw new Error(
                `No line found for edge from ${rectA.toString()} to ${rectB.toString()}`
            );
        }
        return line;
    }

    private static drawEdge(rectA: DrawingVertex, rectB: DrawingVertex): void {
        try {
            const dividendX =
                rectA.left * rectB.left - rectA.right * rectB.right;
            const divisorX =
                rectA.left + rectB.left - (rectA.right + rectB.right);
            const x = dividendX / divisorX;

            const dividendY =
                rectA.top * rectB.top - rectA.bottom * rectB.bottom;
            const divisorY =
                rectA.top + rectB.top - (rectA.bottom + rectB.bottom);
            const y = dividendY / divisorY;

            const optimalPoint = new Point(x, y);
            const line = Canvas.getEdgeDrawing(rectA, rectB);
            const anchorA = optimalPoint.copy();
            const anchorB = optimalPoint.copy();

            if (rectA.right < rectB.left) {
                anchorA.x = rectA.right;
                anchorB.x = rectB.left;
            } else if (rectA.left > rectB.right) {
                anchorA.x = rectA.left;
                anchorB.x = rectB.right;
            }

            if (rectA.top > rectB.bottom) {
                anchorA.y = rectA.top;
                anchorB.y = rectB.bottom;
            } else if (rectA.bottom < rectB.top) {
                anchorA.y = rectA.bottom;
                anchorB.y = rectB.top;
            }

            line.pointA = anchorA;
            line.pointB = anchorB;
        } catch (error) {
            console.error(
                `Error drawing edge from ${rectA.toString()} to ${rectB.toString()}:`,
                error
            );
        }
    }

    private static animate() {
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
            const rect = new DrawingVertex(randomPosition.x, randomPosition.y, vertex);
            rect.fill = 'plum';
            drawingGraph.insertVertex(rect);
            drawingMap.set(vertex, rect);
        });

        graph.edges.forEach((edge) => {
            const rectA = drawingMap.get(edge[0]);
            const rectB = drawingMap.get(edge[1]);
            if (undefined === rectA || undefined === rectB) {
                throw new Error(`Edge ${edge} contains undefined points`);
            }
            drawingGraph.insertDirectedEdge(rectA, rectB);
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
            const rect = edge[0];
            const neighbors = Canvas._drawingGraph.getAdjacentVertices(rect);
            const neighborsMap = new Map<DrawingVertex, DrawingLine>();
            neighbors.forEach((neighbor) => {
                const line = new DrawingLine(rect.position, neighbor.position);
                line.stroke = 'black';
                Canvas.addDrawing(line.svg);
                neighborsMap.set(neighbor, line);
            });
            Canvas._edgeMap.set(rect, neighborsMap);
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
