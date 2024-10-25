// @prettier

import PointInterface from './interfaces/PointInterface.js';
import Vector from './Vector.js';

export default class Point implements PointInterface {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        if (false === isFinite(x) || false === isFinite(y)) {
            throw new Error(
                `Point constructor failed: Invalid arguments: ${x}, ${y}`
            );
        }

        this._x = x;
        this._y = y;
    }

    public getDirection(to: Point) {
        const vectorA = new Vector(this.x, this.y);
        const vectorB = new Vector(to.x, to.y);
        return vectorB.sub(vectorA).toUnitVector();
    }

    public getDistance(to: Point) {
        const vectorA = new Vector(this.x, this.y);
        const vectorB = new Vector(to.x, to.y);
        return vectorB.sub(vectorA).magnitude;
    }

    public offset(offset: Vector) {
        this.x = this.x + offset.x;
        this.y = this.y + offset.y;
    }

    public get x(): number {
        return this._x;
    }

    public set x(newX: number) {
        this._x = newX;
    }

    public get y(): number {
        return this._y;
    }

    public set y(newY: number) {
        this._y = newY;
    }
}
