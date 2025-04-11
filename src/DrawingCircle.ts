// @prettier

import Canvas from './Canvas.js';
import Point from './Point.js';

export default class DrawingCircle {
    private _center: Point;
    private _radius = 10;
    private _svg: SVGCircleElement;

    constructor(x = 0, y = 0) {
        this._center = new Point(x, y);
        this._svg = this.makeSvgCircle();
    }

    private makeSvgCircle(): SVGCircleElement {
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

    public show(visible: boolean): void {
        if (true === visible) {
            Canvas.addDrawing(this._svg);
        } else {
            Canvas.removeDrawing(this._svg);
        }
    }

    public get radius(): number {
        return this._radius;
    }

    public set radius(newRadius: number) {
        this._radius = newRadius;
        this._svg.setAttribute('r', String(this._radius));
    }

    public get center(): Point {
        return this._center;
    }

    public set center(newCenter: Point) {
        this._center = newCenter;
        this._svg.setAttribute('cx', String(this._center.x));
        this._svg.setAttribute('cy', String(this._center.y));
    }
}
