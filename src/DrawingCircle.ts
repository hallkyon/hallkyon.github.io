// @prettier

import Canvas from './Canvas.js';
import DrawingCircleInterface from './interfaces/DrawingCircleInterface.js';
import Point from './Point.js';

export default class DrawingCircle implements DrawingCircleInterface {
    private readonly _position: Point;
    private readonly _svg: SVGCircleElement;

    constructor(x = Canvas.center.x, y = Canvas.center.y) {
        this._position = new Point(x, y);
        this._svg = this.makeSvgCircle();
        this.show();
    }

    private makeSvgCircle(): SVGCircleElement {
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

    public show(): void {
        Canvas.addDrawing(this._svg);
    }

    public hide(): void {
        Canvas.removeDrawing(this._svg);
    }

    public get x(): number {
        return this._position.x;
    }

    public set x(newX: number) {
        this._position.x = newX;
        this._svg.setAttribute('cx', String(newX));
    }

    public get y(): number {
        return this._position.y;
    }

    public set y(newY: number) {
        this._position.y = newY;
        this._svg.setAttribute('cy', String(newY));
    }

    public get radius(): number {
        return Number(this._svg.getAttribute('r') ?? 0);
    }

    public set radius(newRadius: number) {
        this._svg.setAttribute('r', String(newRadius));
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
