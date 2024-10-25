// @prettier

import PointMassInterface from './interfaces/PointMassInterface.js';
import DrawingPoint from './DrawingPoint.js';
import Point from './Point.js';
import Vector from './Vector.js';

export default class PointMass implements PointMassInterface {
    private _position: Point;
    private _force: Vector;
    private _appearance: DrawingPoint;

    constructor(x: number, y: number) {
        this._position = new Point(x, y);
        this._force = new Vector(0, 0);

        this._appearance = new DrawingPoint(x, y);
        this._appearance.show(true);
    }

    public getDirection(to: PointMass): Vector {
        return this.position.getDirection(to.position);
    }

    public getDistance(to: PointMass): number {
        return this.position.getDistance(to.position);
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
