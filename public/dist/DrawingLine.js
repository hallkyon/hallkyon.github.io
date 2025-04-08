// @prettier
import Canvas from './Canvas.js';
export default class DrawingLine {
    constructor(pointA, pointB) {
        this._pointA = pointA;
        this._pointB = pointB;
        this._svg = this.makeSvgLine();
        this.show();
    }
    makeSvgLine() {
        const namespace = 'http://www.w3.org/2000/svg';
        const shape = 'line';
        const svg = document.createElementNS(namespace, shape);
        const stroke = 'white';
        svg.setAttribute('x1', String(this._pointA.x));
        svg.setAttribute('y1', String(this._pointA.y));
        svg.setAttribute('x2', String(this._pointB.x));
        svg.setAttribute('y2', String(this._pointB.y));
        svg.setAttribute('stroke', stroke);
        return svg;
    }
    show() {
        Canvas.addDrawing(this._svg);
    }
    hide() {
        Canvas.removeDrawing(this._svg);
    }
    get pointA() {
        return this._pointA;
    }
    set pointA(newPoint) {
        this._pointA = newPoint;
        this._svg.setAttribute('x1', String(newPoint.x));
        this._svg.setAttribute('y1', String(newPoint.y));
    }
    get pointB() {
        return this._pointB;
    }
    set pointB(newPoint) {
        this._pointB = newPoint;
        this._svg.setAttribute('x2', String(newPoint.x));
        this._svg.setAttribute('y2', String(newPoint.y));
    }
}
//# sourceMappingURL=DrawingLine.js.map