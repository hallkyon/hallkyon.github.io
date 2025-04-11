// @prettier

import DrawingPointInterface from './interfaces/DrawingPointInterface.js';
import PointMassInterface from './interfaces/PointMassInterface.js';
import Point from './Point.js';
import Vector from './Vector.js';

export default class PointMass implements PointMassInterface {
    private _position: Point;
    private _force: Vector;
    private _appearance: DrawingPointInterface;

    constructor(x: number, y: number, appearance: DrawingPointInterface) {
        this._position = new Point(x, y);
        this._force = new Vector(0, 0);

        this._appearance = appearance;
        this._appearance.show(true);
    }

    public getDirection(to: Point): Vector {
        return this.position.getDirection(to);
    }

    public getDistance(to: Point): number {
        return this.position.getDistance(to);
    }

    public applyForce(): Point {
        const newPosition = new Point(
            this.position.x + this.force.x,
            this.position.y + this.force.y
        );
        this.position = newPosition;
        return this.position;
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
