// @prettier

import Point from './Point.js';
import Vector from './Vector.js';

export default class Boundary {
    private _center: Point;
    private _radius = 1;

    constructor(center: Point) {
        this._center = center;
    }

    isInside(point: Point): boolean {
        const distance = new Vector(
            point.x - this._center.x,
            point.y - this._center.y
        ).magnitude;
        return distance <= this._radius;
    }

    get center(): Point {
        return this._center;
    }

    set center(newCenter: Point) {
        this._center = newCenter;
    }

    get radius(): number {
        return this._radius;
    }

    set radius(newRadius: number) {
        this._radius = newRadius;
    }
}
