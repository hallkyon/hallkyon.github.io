// @prettier
import Point from './Point.js';
export default class DrawingRect {
    constructor(x, y) {
        this._position = new Point(x, y);
        this._svg = this.makeSvgRect();
    }
    makeSvgRect() {
        const namespace = 'http://www.w3.org/2000/svg';
        const shape = 'rect';
        const svg = document.createElementNS(namespace, shape);
        const height = 30 * Math.floor(3 * Math.random() + 1);
        const width = 30 * Math.floor(5 * Math.random() + 1);
        const fill = 'white';
        svg.setAttribute('transform', `translate(${-width / 2}, ${-height / 2})`);
        svg.setAttribute('height', String(height));
        svg.setAttribute('width', String(width));
        svg.setAttribute('x', String(this._position.x));
        svg.setAttribute('y', String(this._position.y));
        svg.setAttribute('fill', fill);
        return svg;
    }
    get svg() {
        return this._svg;
    }
    get x() {
        return this._position.x;
    }
    set x(newX) {
        this._position.x = newX;
        this._svg.setAttribute('x', String(newX));
    }
    get y() {
        return this._position.y;
    }
    set y(newY) {
        this._position.y = newY;
        this._svg.setAttribute('y', String(newY));
    }
    get top() {
        return this.y - this.height / 2;
    }
    get right() {
        return this.x + this.width / 2;
    }
    get bottom() {
        return this.y + this.height / 2;
    }
    get left() {
        return this.x - this.width / 2;
    }
    get topLeft() {
        return new Point(this.left, this.top);
    }
    get topRight() {
        return new Point(this.right, this.top);
    }
    get bottomRight() {
        return new Point(this.right, this.bottom);
    }
    get bottomLeft() {
        return new Point(this.left, this.bottom);
    }
    get width() {
        const width = this._svg.getAttribute('width');
        return width ? parseFloat(width) : 0;
    }
    set width(newWidth) {
        if (newWidth < 0) {
            throw new Error(`Invalid width: ${newWidth}`);
        }
        this._svg.setAttribute('width', String(newWidth));
    }
    get height() {
        const height = this._svg.getAttribute('height');
        return height ? parseFloat(height) : 0;
    }
    set height(newHeight) {
        if (newHeight < 0) {
            throw new Error(`Invalid height: ${newHeight}`);
        }
        this._svg.setAttribute('height', String(newHeight));
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
    toString() {
        return `DrawingRect(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
    }
}
//# sourceMappingURL=DrawingRect.js.map