// @prettier

import Canvas from './Canvas.js';
import DrawingPointInterface from './interfaces/DrawingPointInterface.js';
import Point from './Point.js';

export default class DrawingPoint implements DrawingPointInterface {
    private _position: Point;
    private _svg: SVGCircleElement;

    constructor(x: number, y: number) {
        this._position = new Point(x, y);
        this._svg = this.makeSvgCircle();
    }

    private makeSvgCircle(): SVGCircleElement {
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

    public show(enable: boolean): void {
        if (true === enable) {
            Canvas.addDrawing(this._svg);
        } else {
            Canvas.removeDrawing(this._svg);
        }
    }

    public get position(): Point {
        return this._position;
    }

    public set position(newPosition: Point) {
        this._position = newPosition;
        this._svg.setAttribute('cx', String(newPosition.x));
        this._svg.setAttribute('cy', String(newPosition.y));
    }

    public set x(newX: number) {
        this._position.x = newX;
        this._svg.setAttribute('cx', String(newX));
    }

    public set y(newY: number) {
        this._position.y = newY;
        this._svg.setAttribute('cy', String(newY));
    }
}
