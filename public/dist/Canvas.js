// @prettier
import DrawingRect from './DrawingRect.js';
import DrawingLine from './DrawingLine.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Point from './Point.js';
class Canvas {
    static getVertexDrawing(point) {
        const rect = Canvas.vertexMap.get(point);
        if (undefined === rect) {
            throw new Error(`No drawing found for point ${point.toString()}`);
        }
        return rect;
    }
    static getEdgeDrawing(pointA, pointB) {
        const map = Canvas._edgeMap.get(pointA);
        if (undefined === map) {
            throw new Error(`No edge map found for point ${pointA.toString()}`);
        }
        const line = map.get(pointB);
        if (undefined === line) {
            throw new Error(`No line found for edge from ${pointA.toString()} to ${pointB.toString()}`);
        }
        return line;
    }
    static drawVertex(point) {
        const rect = Canvas.getVertexDrawing(point);
        rect.position = point;
    }
    static drawEdge(pointA, pointB) {
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
            }
            else {
                anchorA.x = rectA.left;
                anchorB.x = rectB.right;
            }
        }
        if (Math.abs(vector.y) >= (rectA.height + rectB.height) / 2) {
            if (vector.y > 0) {
                anchorA.y = rectA.bottom;
                anchorB.y = rectB.top;
            }
            else {
                anchorA.y = rectA.top;
                anchorB.y = rectB.bottom;
            }
        }
        line.pointA = anchorA;
        line.pointB = anchorB;
    }
    static addDrawing(drawing, id) {
        const canvas = document.getElementById(id);
        if (null === canvas) {
            throw new Error('Canvas element with id "vertices" not found');
        }
        canvas.appendChild(drawing);
    }
    static animate(timestamp) {
        Canvas._pointGraph = EadesEmbedder.embed(Canvas._pointGraph);
        Canvas._pointGraph.vertices.forEach((point) => {
            Canvas.drawVertex(point);
        });
        Canvas._pointGraph.edges.forEach((edge) => {
            Canvas.drawEdge(edge[0], edge[1]);
        });
        requestAnimationFrame(Canvas.animate);
    }
    static createPointGraph(graph) {
        const pointGraph = new Graph();
        const pointMap = new Map();
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
    static removeDrawing(drawing) {
        const canvas = document.getElementById('svg');
        if (null === canvas) {
            throw new Error('Canvas element with id "svg" not found');
        }
        canvas.removeChild(drawing);
    }
    static draw(graph) {
        Canvas._pointGraph = Canvas.createPointGraph(graph);
        Canvas._pointGraph.vertices.forEach((vertex) => {
            const rect = new DrawingRect(Canvas.center.x, Canvas.center.y);
            Canvas.addDrawing(rect.svg, 'clip-path-vertices');
            Canvas.vertexMap.set(vertex, rect);
        });
        Canvas._pointGraph.edges.forEach((edge) => {
            const point = edge[0];
            const neighbors = Canvas._pointGraph.getAdjacentVertices(point);
            const neighborsMap = new Map();
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
Canvas.vertexMap = new Map();
Canvas._edgeMap = new Map();
export default Canvas;
//# sourceMappingURL=Canvas.js.map