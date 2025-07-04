// @prettier
import DrawingRect from './DrawingRect.js';
import DrawingLine from './DrawingLine.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Point from './Point.js';
class Canvas {
    static getEdgeDrawing(rectA, rectB) {
        const map = Canvas._edgeMap.get(rectA);
        if (undefined === map) {
            throw new Error(`No edge map found for point ${rectA.toString()}`);
        }
        const line = map.get(rectB);
        if (undefined === line) {
            throw new Error(`No line found for edge from ${rectA.toString()} to ${rectB.toString()}`);
        }
        return line;
    }
    static drawEdge(rectA, rectB) {
        try {
            const line = Canvas.getEdgeDrawing(rectA, rectB);
            let vector = rectA.position.getDirectedVector(rectB.position);
            const vectorScalar = rectA.width / (rectA.width + rectB.width);
            const dx = vectorScalar * vector.x;
            const dy = vectorScalar * vector.y;
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
        catch (error) {
            console.error(`Error drawing edge from ${rectA.toString()} to ${rectB.toString()}:`, error);
        }
    }
    static animate(timestamp) {
        Canvas._drawingGraph = EadesEmbedder.embed(Canvas._drawingGraph);
        Canvas._drawingGraph.edges.forEach((edge) => {
            Canvas.drawEdge(edge[0], edge[1]);
        });
        requestAnimationFrame(Canvas.animate);
    }
    static addDrawing(drawing, id) {
        const canvas = document.getElementById(id);
        if (null === canvas) {
            throw new Error(`Canvas element with id ${id} not found`);
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
    static createDrawingRectGraph(graph) {
        const drawingGraph = new Graph();
        const drawingMap = new Map();
        graph.vertices.forEach((vertex) => {
            const rect = new DrawingRect(Canvas.width / 2, Canvas.height / 2);
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
    static draw(graph) {
        Canvas._drawingGraph = Canvas.createDrawingRectGraph(graph);
        Canvas._drawingGraph.vertices.forEach((vertex) => {
            Canvas.addDrawing(vertex.svg, 'clip-path-vertices');
        });
        Canvas._drawingGraph.edges.forEach((edge) => {
            if (Canvas._edgeMap.has(edge[0])) {
                return; // Edge already exists
            }
            const rect = edge[0];
            const neighbors = Canvas._drawingGraph.getAdjacentVertices(rect);
            const neighborsMap = new Map();
            neighbors.forEach((neighbor) => {
                const line = new DrawingLine(rect.position, neighbor.position);
                line.stroke = 'black';
                Canvas.addDrawing(line.svg, 'svg');
                neighborsMap.set(neighbor, line);
            });
            Canvas._edgeMap.set(rect, neighborsMap);
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
Canvas._edgeMap = new Map();
export default Canvas;
//# sourceMappingURL=Canvas.js.map