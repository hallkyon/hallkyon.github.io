// @prettier

import PointMassInterface from './interfaces/PointMassInterface.js';
import Point from './Point.js';
import Vector from './Vector.js';

export default class PointMass implements PointMassInterface {
    private readonly _position: Point = new Point(0, 0);
    private _force: Vector = new Vector(0, 0);

    constructor(x: number, y: number) {
        this.position = new Point(x, y);
    }

    public getDirection(to: PointMass): Vector {
        return this.position.getDirection(to.position);
    }

    public getDistance(to: PointMass): number {
        return this.position.getDistance(to.position);
    }

    public get x(): number {
        return this._position.x;
    }

    public set x(newX: number) {
        this._position.x = newX;
    }

    public get y(): number {
        return this._position.y;
    }

    public set y(newY: number) {
        this._position.y = newY;
    }

    public get position(): Point {
        return this._position;
    }

    public set position(newPosition: Point) {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }

    public get force(): Vector {
        return this._force;
    }

    public set force(newForce: Vector) {
        this._force = newForce;
    }
}
