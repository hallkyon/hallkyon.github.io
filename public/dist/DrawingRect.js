import Point from './Point.js';
import Canvas from './Canvas.js';
export default class DrawingRect {
    constructor(x, y, label) {
        this._position = Canvas.center;
        this._maxLabelLength = 200;
        this._fill = 'white';
        const namespace = 'http://www.w3.org/2000/svg';
        this._position = new Point(x, y);
        this._svgText = document.createElementNS(namespace, 'text');
        this._svgText.setAttribute('x', String(this._position.x));
        this._svgText.setAttribute('y', String(this._position.y));
        this._svgText.setAttribute('dy', '1em');
        this._svgRect = document.createElementNS(namespace, 'rect');
        this._svgRect.setAttribute('x', String(this._position.x));
        this._svgRect.setAttribute('y', String(this._position.y));
        this._svgRect.setAttribute('fill', this._fill);
        this._svgGroup = document.createElementNS(namespace, 'g');
        this._svgGroup.appendChild(this._svgRect);
        this._svgGroup.appendChild(this._svgText);
        Canvas.addDrawing(this._svgGroup);
        this.label = label;
    }
    get svg() {
        return this._svgGroup;
    }
    get x() {
        return this._position.x;
    }
    set x(newX) {
        this._position.x = newX;
        this._svgRect.setAttribute('x', String(newX));
        this._svgText.setAttribute('x', String(newX));
        const tspans = this._svgText.querySelectorAll('tspan');
        tspans.forEach((tspan) => {
            tspan.setAttribute('x', String(newX));
        });
    }
    get y() {
        return this._position.y;
    }
    set y(newY) {
        this._position.y = newY;
        this._svgRect.setAttribute('y', String(newY));
        this._svgText.setAttribute('y', String(newY));
    }
    get label() {
        return this._label;
    }
    set label(label) {
        this._label = label;
        const namespace = 'http://www.w3.org/2000/svg';
        const words = this._label.split(/\s+/);
        let line = [];
        while (this._svgText.firstChild) {
            this._svgText.removeChild(this._svgText.firstChild);
        }
        let tspan = document.createElementNS(namespace, 'tspan');
        this._svgText.appendChild(tspan);
        words.forEach((word) => {
            line.push(word);
            tspan.textContent = line.join(' ');
            if (tspan.getComputedTextLength() > this._maxLabelLength) {
                line.pop();
                tspan.textContent = line.join(' ');
                line = [word];
                tspan = document.createElementNS(namespace, 'tspan');
                tspan.setAttribute('x', String(this.position.x));
                tspan.setAttribute('dy', `1.2em`);
                tspan.textContent = word;
                this._svgText.appendChild(tspan);
            }
        });
        const padding = 20;
        const textBoundingBox = this._svgText.getBBox();
        this.width = textBoundingBox.width + padding;
        this.height = textBoundingBox.height + padding;
        this._svgGroup.setAttribute('transform', `translate(${-this.width / 2}, ${-this.height / 2})`);
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
        const width = this._svgRect.getAttribute('width');
        return width ? parseFloat(width) : 0;
    }
    set width(newWidth) {
        const textBoundingBox = this._svgText.getBBox();
        if (newWidth < textBoundingBox.width) {
            throw new Error(`Invalid width: ${newWidth}`);
        }
        this._svgRect.setAttribute('width', String(newWidth));
        const textTranslationX = (newWidth - textBoundingBox.width) / 2;
        const textTranslationY = (this.height - textBoundingBox.height) / 2;
        this._svgText.setAttribute('transform', `translate(${textTranslationX}, ${textTranslationY})`);
    }
    get height() {
        const height = this._svgRect.getAttribute('height');
        return height ? parseFloat(height) : 0;
    }
    set height(newHeight) {
        const textBoundingBox = this._svgText.getBBox();
        if (newHeight < textBoundingBox.height) {
            throw new Error(`Invalid height: ${newHeight}`);
        }
        this._svgRect.setAttribute('height', String(newHeight));
        const textTranslationX = (this.width - textBoundingBox.width) / 2;
        const textTranslationY = (newHeight - textBoundingBox.height) / 2;
        this._svgText.setAttribute('transform', `translate(${textTranslationX}, ${textTranslationY})`);
    }
    get position() {
        return this._position;
    }
    set position(newPosition) {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
    get fill() {
        return this._fill;
    }
    set fill(newFill) {
        this._fill = newFill;
        this._svgRect.setAttribute('fill', newFill);
    }
    get stroke() {
        var _a;
        return (_a = this._svgRect.getAttribute('stroke')) !== null && _a !== void 0 ? _a : '';
    }
    set stroke(newStroke) {
        this._svgRect.setAttribute('stroke', newStroke);
    }
    toString() {
        return `DrawingRect(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
    }
}
//# sourceMappingURL=DrawingRect.js.map