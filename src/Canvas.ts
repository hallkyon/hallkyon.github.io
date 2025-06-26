// @prettier

import DrawingRect from './DrawingRect.js';
import DrawingLine from './DrawingLine.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Point from './Point.js';

export default class Canvas {
    private static _pointGraph: Graph<Point>;
    private static readonly vertexMap: Map<Point, DrawingRect> = new Map<
        Point,
        DrawingRect
    >();
    private static readonly _edgeMap: Map<Point, Map<Point, DrawingLine>> =
        new Map<Point, Map<Point, DrawingLine>>();

    private static getVertexDrawing(point: Point): DrawingRect {
        const rect = Canvas.vertexMap.get(point);
        if (undefined === rect) {
            throw new Error(`No drawing found for point ${point.toString()}`);
        }
        return rect;
    }

    private static getEdgeDrawing(pointA: Point, pointB: Point): DrawingLine {
        const map = Canvas._edgeMap.get(pointA);
        if (undefined === map) {
            throw new Error(`No edge map found for point ${pointA.toString()}`);
        }
        const line = map.get(pointB);
        if (undefined === line) {
            throw new Error(
                `No line found for edge from ${pointA.toString()} to ${pointB.toString()}`
            );
        }
        return line;
    }

    private static drawVertex(point: Point): void {
        const rect = Canvas.getVertexDrawing(point);
        rect.position = point;
    }

    private static drawEdge(pointA: Point, pointB: Point): void {
        const line = Canvas.getEdgeDrawing(pointA, pointB);
        const rectA = Canvas.getVertexDrawing(pointA);
        const rectB = Canvas.getVertexDrawing(pointB);

        let vector = rectA.position.getDirection(rectB.position);
        vector.scale(rectA.position.getDistance(rectB.position));

        const dx = vector.x / 2;
        const dy = vector.y / 2;

        const anchorA = new Point(rectA.position.x + dx, rectA.position.y + dy);
        const anchorB = new Point(rectA.position.x + dx, rectA.position.y + dy);

        if (Math.abs(vector.x) >= (rectA.width + rectB.width) / 2) {
            if (vector.x > 0) {
                anchorA.x = rectA.right;
                anchorB.x = rectB.left;
            } else {
                anchorA.x = rectA.left;
                anchorB.x = rectB.right;
            }
        }

        if (Math.abs(vector.y) >= (rectA.height + rectB.height) / 2) {
            if (vector.y > 0) {
                anchorA.y = rectA.bottom;
                anchorB.y = rectB.top;
            } else {
                anchorA.y = rectA.top;
                anchorB.y = rectB.bottom;
            }
        }

        line.pointA = anchorA;
        line.pointB = anchorB;
    }

    private static addDrawing(drawing: SVGElement, id: string): void {
        const canvas = document.getElementById(id);
        if (null === canvas) {
            throw new Error('Canvas element with id "vertices" not found');
        }
        canvas.appendChild(drawing);
    }

    private static animate(timestamp: number) {
        Canvas._pointGraph = EadesEmbedder.embed(Canvas._pointGraph);

        Canvas._pointGraph.vertices.forEach((point) => {
            Canvas.drawVertex(point);
        });

        Canvas._pointGraph.edges.forEach((edge) => {
            Canvas.drawEdge(edge[0], edge[1]);
        });

        requestAnimationFrame(Canvas.animate);
    }

    private static createPointGraph(graph: Graph<number>): Graph<Point> {
        const pointGraph = new Graph<Point>();
        const pointMap = new Map<number, Point>();

        graph.vertices.forEach((vertex) => {
            const point = new Point(Canvas.width / 2, Canvas.height / 2);
            pointGraph.insertVertex(point);
            pointMap.set(vertex, point);
            return point;
        });

        graph.edges.forEach((edge) => {
            const pointA = pointMap.get(edge[0]);
            const pointB = pointMap.get(edge[1]);
            if (undefined === pointA || undefined === pointB) {
                throw new Error(`Edge ${edge} contains undefined points`);
            }
            pointGraph.insertUndirectedEdge(pointA, pointB);
        });

        return pointGraph;
    }

    public static removeDrawing(drawing: SVGElement): void {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.removeChild(drawing);
    }

    public static draw(graph: Graph<number>): void {
        Canvas._pointGraph = Canvas.createPointGraph(graph);

        Canvas._pointGraph.vertices.forEach((vertex: Point) => {
            const rect = new DrawingRect(Canvas.center.x, Canvas.center.y);
            Canvas.addDrawing(rect.svg, 'clip-path-vertices');
            Canvas.vertexMap.set(vertex, rect);
        });

        Canvas._pointGraph.edges.forEach((edge) => {
            const point = edge[0];
            const neighbors = Canvas._pointGraph.getAdjacentVertices(point);
            const neighborsMap = new Map<Point, DrawingLine>();
            neighbors.forEach((neighbor) => {
                const line = new DrawingLine(point, neighbor);
                line.stroke = 'black';
                Canvas.addDrawing(line.svg, 'svg');
                neighborsMap.set(neighbor, line);
            });
            Canvas._edgeMap.set(point, neighborsMap);
        });

        Canvas.animate(0);
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
}
