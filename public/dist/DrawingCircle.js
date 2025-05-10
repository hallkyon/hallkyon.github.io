// @prettier
import Canvas from './Canvas.js';
import Point from './Point.js';
export default class DrawingCircle {
    constructor(x = Canvas.center.x, y = Canvas.center.y) {
        this._position = new Point(x, y);
        this._svg = this.makeSvgCircle();
        this.show();
    }
    makeSvgCircle() {
        const namespace = 'http://www.w3.org/2000/svg';
        const shape = 'circle';
        const svg = document.createElementNS(namespace, shape);
        const radius = 1;
        const fill = 'white';
        svg.setAttribute('cx', String(this._position.x));
        svg.setAttribute('cy', String(this._position.y));
        svg.setAttribute('r', String(radius));
        svg.setAttribute('fill', fill);
        return svg;
    }
    show() {
        Canvas.addDrawing(this._svg);
    }
    hide() {
        Canvas.removeDrawing(this._svg);
    }
    get x() {
        return this._position.x;
    }
    set x(newX) {
        this._position.x = newX;
        this._svg.setAttribute('cx', String(newX));
    }
    get y() {
        return this._position.y;
    }
    set y(newY) {
        this._position.y = newY;
        this._svg.setAttribute('cy', String(newY));
    }
    get radius() {
        var _a;
        return Number((_a = this._svg.getAttribute('r')) !== null && _a !== void 0 ? _a : 0);
    }
    set radius(newRadius) {
        this._svg.setAttribute('r', String(newRadius));
    }
    get position() {
        return this._position;
    }
    set position(newPosition) {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
    get fill() {
        var _a;
        return (_a = this._svg.getAttribute('fill')) !== null && _a !== void 0 ? _a : '';
    }
    set fill(newFill) {
        this._svg.setAttribute('fill', newFill);
    }
    get stroke() {
        var _a;
        return (_a = this._svg.getAttribute('stroke')) !== null && _a !== void 0 ? _a : '';
    }
    set stroke(newStroke) {
        this._svg.setAttribute('stroke', newStroke);
    }
}
//# sourceMappingURL=DrawingCircle.js.map