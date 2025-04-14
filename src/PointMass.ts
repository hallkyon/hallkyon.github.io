// @prettier

import DrawingPointInterface from './interfaces/DrawingPointInterface.js';
import PointMassInterface from './interfaces/PointMassInterface.js';
import Point from './Point.js';
import Vector from './Vector.js';

export default class PointMass implements PointMassInterface {
    private _appearance: DrawingPointInterface;
    private _position: Point = new Point(0, 0);
    private _force: Vector = new Vector(0, 0);

    constructor(x = 0, y = 0, appearance: DrawingPointInterface) {
        this._appearance = appearance;
        this._appearance.show(true);

        this.position = new Point(x, y);
    }

    public getDirection(to: Point): Vector {
        return this.position.getDirection(to);
    }

    public getDistance(to: Point): number {
        return this.position.getDistance(to);
    }

    public get position(): Point {
        return this._position;
    }

    public set position(newPosition: Point) {
        this._position = newPosition;
        this._appearance.position = newPosition;
    }

    public get force(): Vector {
        return this._force;
    }

    public set force(newForce: Vector) {
        this._force = newForce;
    }
}
