// @prettier

import DrawingCircle from './DrawingCircle.js';
import DrawingLine from './DrawingLine.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Point from './Point.js';

export default class Canvas {
    private static _pointGraph: Graph<Point>;
    private static readonly _pointMap: Map<string, Point> = new Map();
    private static readonly _circleMap: Map<Point, DrawingCircle> = new Map();
    private static readonly _edgeArray: DrawingLine[] = [];

    private static animate(timestamp: number) {
        Canvas._pointGraph = EadesEmbedder.embed(Canvas._pointGraph);

        Canvas._pointGraph.vertices.forEach((pointA) => {
            const circle = Canvas._circleMap.get(pointA);
            if (circle === undefined) {
                throw new Error(`Circle for point ${pointA} not found`);
            }
            circle.x = pointA.x;
            circle.y = pointA.y;

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
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
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

    public static draw(graph: Graph<string>): void {
        Canvas._pointGraph = new Graph<Point>();
        graph.vertices.forEach((vertex) => {
            const point = new Point(Canvas.center.x, Canvas.center.y);
            Canvas._pointMap.set(vertex, point);
            Canvas._pointGraph.insertVertex(point);

            const circle = new DrawingCircle();
            circle.fill = 'white';
            circle.stroke = 'white';
            circle.radius = 3;
            circle.show();
            Canvas._circleMap.set(point, circle);
        });

        graph.edges.forEach((edge) => {
            const pointA = Canvas._pointMap.get(edge[0]);
            const pointB = Canvas._pointMap.get(edge[1]);
            if (pointA === undefined || pointB === undefined) {
                throw new Error(`Edge ${edge} contains undefined points`);
            }
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
