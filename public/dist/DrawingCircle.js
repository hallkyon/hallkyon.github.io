// @prettier
import Canvas from './Canvas.js';
import Point from './Point.js';
export default class DrawingCircle {
    constructor(x = 0, y = 0) {
        this._radius = 10;
        this._center = new Point(x, y);
        this._svg = this.makeSvgCircle();
    }
    makeSvgCircle() {
        const namespace = 'http://www.w3.org/2000/svg';
        const shape = 'circle';
        const svg = document.createElementNS(namespace, shape);
        const fill = 'transparent';
        svg.setAttribute('cx', String(this._center.x));
        svg.setAttribute('cy', String(this._center.y));
        svg.setAttribute('r', String(this._radius));
        svg.setAttribute('fill', fill);
        svg.setAttribute('stroke', 'white');
        return svg;
    }
    show(visible) {
        if (true === visible) {
            Canvas.addDrawing(this._svg);
        }
        else {
            Canvas.removeDrawing(this._svg);
        }
    }
    get radius() {
        return this._radius;
    }
    set radius(newRadius) {
        this._radius = newRadius;
        this._svg.setAttribute('r', String(this._radius));
    }
    get center() {
        return this._center;
    }
    set center(newCenter) {
        this._center = newCenter;
        this._svg.setAttribute('cx', String(this._center.x));
        this._svg.setAttribute('cy', String(this._center.y));
    }
}
