// @prettier

import Point from './Point.js';
import Vector from './Vector.js';
import DrawingCircle from './DrawingCircle.js';
import PointMass from './PointMass.js';

export default class Boundary {
    private _appearance: DrawingCircle;
    private _center: Point = new Point(0, 0);
    private _radius: number = 1;

    private _pointMasses: PointMass[] = [];

    constructor(x = 0, y = 0, appearance: DrawingCircle) {
        this._appearance = appearance;
        this._appearance.show(true);

        this.center = new Point(x, y);
    }

    public isInside(point: Point): boolean {
        const distance = new Vector(
            point.x - this._center.x,
            point.y - this._center.y
        ).magnitude;
        return distance <= this._radius;
    }

    public insert(pointMass: PointMass): void {
        this._pointMasses.push(pointMass);
    }

    public get center(): Point {
        return this._center;
    }

    public set center(newCenter: Point) {
        this._center = newCenter;
        this._appearance.center = newCenter;
    }

    public get radius(): number {
        return this._radius;
    }

    public set radius(newRadius: number) {
        this._radius = newRadius;
        this._appearance.radius = newRadius;
    }
}
