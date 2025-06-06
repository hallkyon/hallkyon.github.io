// @prettier
import DrawingCircle from './DrawingCircle.js';
import DrawingLine from './DrawingLine.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Point from './Point.js';
class Canvas {
    static animate(timestamp) {
        Canvas._pointGraph = EadesEmbedder.embed(Canvas._pointGraph);
        Canvas._pointGraph.vertices.forEach((pointA, index) => {
            const circle = Canvas._vertexArray[index];
            circle.x = pointA.x;
            circle.y = pointA.y;
            const neighbors = Canvas._pointGraph.getAdjacentVertices(pointA);
            neighbors.forEach((pointB) => {
                const line = Canvas._edgeArray.find((l) => l.pointA === pointA && l.pointB === pointB);
                if (line) {
                    line.pointA = pointA;
                    line.pointB = pointB;
                }
            });
        });
        requestAnimationFrame(Canvas.animate);
    }
    static addDrawing(drawing) {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.appendChild(drawing);
    }
    static removeDrawing(drawing) {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.removeChild(drawing);
    }
    static draw(graph) {
        Canvas._pointGraph = new Graph();
        graph.vertices.forEach((vertex) => {
            const point = new Point(Canvas.center.x, Canvas.center.y);
            Canvas._pointArray[vertex] = point;
            Canvas._pointGraph.insertVertex(point);
            const circle = new DrawingCircle();
            circle.fill = 'white';
            circle.stroke = 'white';
            circle.radius = 3;
            circle.show();
            Canvas._vertexArray[vertex] = circle;
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
    static get height() {
        return window.innerHeight;
    }
    static get width() {
        return window.innerWidth;
    }
    static get center() {
        return new Point(Canvas.width / 2, Canvas.height / 2);
    }
}
Canvas._pointArray = [];
Canvas._vertexArray = [];
Canvas._edgeArray = [];
export default Canvas;
//# sourceMappingURL=Canvas.js.map