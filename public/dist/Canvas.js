// @prettier
import DrawingRect from './DrawingRect.js';
import DrawingLine from './DrawingLine.js';
import EadesEmbedder from './EadesEmbedder.js';
import Graph from './Graph.js';
import Point from './Point.js';
class Canvas {
    static setViewBox() {
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
    }
    static onPointerDown(event) {
        Canvas._pointerDown = true;
        Canvas.delta = new Point(event.clientX, event.clientY);
    }
    static onPointerUp(event) {
        Canvas._pointerDown = false;
    }
    static onPointerMove(event) {
        if (!Canvas._pointerDown) {
            return;
        }
        const newPosition = new Point(event.clientX, event.clientY);
        const direction = newPosition
            .getPositionVector()
            .sub(Canvas.delta.getPositionVector());
        Canvas.viewBox.x -= direction.x;
        Canvas.viewBox.y -= direction.y;
        Canvas.delta = newPosition.copy();
    }
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
            const dividendX = rectA.left * rectB.left - rectA.right * rectB.right;
            const divisorX = rectA.left + rectB.left - (rectA.right + rectB.right);
            const x = dividendX / divisorX;
            const dividendY = rectA.top * rectB.top - rectA.bottom * rectB.bottom;
            const divisorY = rectA.top + rectB.top - (rectA.bottom + rectB.bottom);
            const y = dividendY / divisorY;
            const optimalPoint = new Point(x, y);
            const line = Canvas.getEdgeDrawing(rectA, rectB);
            const anchorA = optimalPoint.copy();
            const anchorB = optimalPoint.copy();
            if (rectA.right < rectB.left) {
                anchorA.x = rectA.right;
                anchorB.x = rectB.left;
            }
            else if (rectA.left > rectB.right) {
                anchorA.x = rectA.left;
                anchorB.x = rectB.right;
            }
            if (rectA.top > rectB.bottom) {
                anchorA.y = rectA.top;
                anchorB.y = rectB.bottom;
            }
            else if (rectA.bottom < rectB.top) {
                anchorA.y = rectA.bottom;
                anchorB.y = rectB.top;
            }
            line.pointA = anchorA;
            line.pointB = anchorB;
        }
        catch (error) {
            console.error(`Error drawing edge from ${rectA.toString()} to ${rectB.toString()}:`, error);
        }
    }
    static animate() {
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
    static draw(graph) {
        Canvas.setViewBox();
        Canvas._drawingGraph = Canvas.createDrawingRectGraph(graph);
        Canvas._drawingGraph.vertices.forEach((vertex) => {
            Canvas.addDrawing(vertex.svg, 'svg');
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
        Canvas.animate();
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
    static get viewBox() {
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
Canvas._edgeMap = new Map();
Canvas._pointerDown = false;
export default Canvas;
//# sourceMappingURL=Canvas.js.map