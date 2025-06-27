// @prettier

import DrawingRectInterface from './interfaces/DrawingRectInterface.js';
import Point from './Point.js';

export default class DrawingRect implements DrawingRectInterface {
    private readonly _position: Point;
    private readonly _svg: SVGRectElement;

    constructor(x: number, y: number) {
        this._position = new Point(x, y);
        this._svg = this.makeSvgRect();
    }

    private makeSvgRect(): SVGRectElement {
        const namespace = 'http://www.w3.org/2000/svg';
        const shape = 'rect';
        const svg = document.createElementNS(namespace, shape);

        const height = 30;
        const width = 30;
        const fill = 'white';

        svg.setAttribute(
            'transform',
            `translate(${-width / 2}, ${-height / 2})`
        );
        svg.setAttribute('height', String(height));
        svg.setAttribute('width', String(width));
        svg.setAttribute('x', String(this._position.x));
        svg.setAttribute('y', String(this._position.y));
        svg.setAttribute('fill', fill);

        return svg;
    }

    public get svg(): SVGElement {
        return this._svg;
    }

    public get x(): number {
        return this._position.x;
    }

    public set x(newX: number) {
        this._position.x = newX;
        this._svg.setAttribute('x', String(newX));
    }

    public get y(): number {
        return this._position.y;
    }

    public set y(newY: number) {
        this._position.y = newY;
        this._svg.setAttribute('y', String(newY));
    }

    get top(): number {
        return this.y - this.height / 2;
    }

    get right(): number {
        return this.x + this.width / 2;
    }

    get bottom(): number {
        return this.y + this.height / 2;
    }

    get left(): number {
        return this.x - this.width / 2;
    }

    get width(): number {
        const width = this._svg.getAttribute('width');
        return width ? parseFloat(width) : 0;
    }

    set width(newWidth: number) {
        this._svg.setAttribute('width', String(newWidth));
    }

    get height(): number {
        const height = this._svg.getAttribute('height');
        return height ? parseFloat(height) : 0;
    }

    set height(newHeight: number) {
        this._svg.setAttribute('height', String(newHeight));
    }

    public get position(): Point {
        return this._position;
    }

    public set position(newPosition: Point) {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }

    public get fill(): string {
        return this._svg.getAttribute('fill') ?? '';
    }

    public set fill(newFill: string) {
        this._svg.setAttribute('fill', newFill);
    }

    public get stroke(): string {
        return this._svg.getAttribute('stroke') ?? '';
    }

    public set stroke(newStroke: string) {
        this._svg.setAttribute('stroke', newStroke);
    }
}
