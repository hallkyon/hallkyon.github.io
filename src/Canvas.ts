// @prettier

import DrawingRect from './DrawingRect.js';
import DrawingLine from './DrawingLine.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Point from './Point.js';

export default class Canvas {
    private static _pointGraph: Graph<Point>;
    private static readonly _pointArray: Point[] = [];
    private static readonly _vertexArray: DrawingRect[] = [];
    private static readonly _edgeArray: DrawingLine[] = [];

    private static animate(timestamp: number) {
        Canvas._pointGraph = EadesEmbedder.embed(Canvas._pointGraph);

        Canvas._pointGraph.vertices.forEach((pointA, index) => {
            const rect = Canvas._vertexArray[index];
            rect.x = pointA.x;
            rect.y = pointA.y;

            const neighbors = Canvas._pointGraph.getAdjacentVertices(pointA);
            neighbors.forEach((pointB) => {
                const line = Canvas._edgeArray.find(
                    (l) => l.pointA === pointA && l.pointB === pointB
                );
                if (line) {
                    line.pointA = pointA;
                    line.pointB = pointB;
                }
            });
        });

        requestAnimationFrame(Canvas.animate);
    }

    public static addDrawing(drawing: SVGElement): void {
        const canvas = document.getElementById('vertices');
        if (null === canvas) {
            throw new Error('Canvas element with id "vertices" not found');
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

    public static draw(graph: Graph<number>): void {
        Canvas._pointGraph = new Graph<Point>();
        graph.vertices.forEach((vertex) => {
            const point = new Point(Canvas.center.x, Canvas.center.y);
            Canvas._pointArray[vertex] = point;
            Canvas._pointGraph.insertVertex(point);

            const rect = new DrawingRect();
            rect.stroke = 'white';
            rect.show();
            Canvas._vertexArray[vertex] = rect;
        });

        graph.edges.forEach((edge) => {
            const pointA = Canvas._pointArray[edge[0]];
            const pointB = Canvas._pointArray[edge[1]];
            Canvas._pointGraph.insertUndirectedEdge(pointA, pointB);

            const line = new DrawingLine(pointA, pointB);
            line.show();
            Canvas._edgeArray.push(line);
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
