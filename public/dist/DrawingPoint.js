// @prettier
import Canvas from './Canvas.js';
import Point from './Point.js';
export default class DrawingPoint {
    constructor(x = 0, y = 0) {
        this._position = new Point(x, y);
        this._svg = this.makeSvgCircle();
        this.show(true);
    }
    makeSvgCircle() {
        const namespace = 'http://www.w3.org/2000/svg';
        const shape = 'circle';
        const svg = document.createElementNS(namespace, shape);
        const radius = 4;
        const fill = 'white';
        svg.setAttribute('cx', String(this._position.x));
        svg.setAttribute('cy', String(this._position.y));
        svg.setAttribute('r', String(radius));
        svg.setAttribute('fill', fill);
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
    get position() {
        return this._position;
    }
    set position(newPosition) {
        this._position = newPosition;
        this._svg.setAttribute('cx', String(newPosition.x));
        this._svg.setAttribute('cy', String(newPosition.y));
    }
    set x(newX) {
        this._position.x = newX;
        this._svg.setAttribute('cx', String(newX));
    }
    set y(newY) {
        this._position.y = newY;
        this._svg.setAttribute('cy', String(newY));
    }
}
