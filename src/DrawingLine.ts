import DrawingLineInterface from './interfaces/DrawingLineInterface.js';
import Point from './Point.js';

export default class DrawingLine implements DrawingLineInterface {
    private _pointA: Point;
    private _pointB: Point;
    private readonly _svg: SVGLineElement;

    constructor(pointA: Point, pointB: Point) {
        this._pointA = pointA;
        this._pointB = pointB;
        this._svg = this.makeSvgLine();
    }

    private makeSvgLine(): SVGLineElement {
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

    public get svg(): SVGElement {
        return this._svg;
    }

    public get pointA(): Point {
        return this._pointA;
    }

    public set pointA(newPoint: Point) {
        this._pointA = newPoint;
        this._svg.setAttribute('x1', String(newPoint.x));
        this._svg.setAttribute('y1', String(newPoint.y));
    }

    public get pointB(): Point {
        return this._pointB;
    }

    public set pointB(newPoint: Point) {
        this._pointB = newPoint;
        this._svg.setAttribute('x2', String(newPoint.x));
        this._svg.setAttribute('y2', String(newPoint.y));
    }

    get stroke(): string {
        return this._svg.getAttribute('stroke') ?? '';
    }

    set stroke(newStroke: string) {
        this._svg.setAttribute('stroke', newStroke);
    }
}
