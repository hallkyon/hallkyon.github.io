import type PointInterface from './interfaces/PointInterface';
import Vector from './Vector';

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

    public copy(): Point {
        return new Point(this.x, this.y);
    }

    public getPositionVector(): Vector {
        return new Vector(this.x, this.y);
    }

    public getDirectedVector(to: Point): Vector {
        const vectorA = this.getPositionVector();
        const vectorB = to.getPositionVector();
        return vectorB.sub(vectorA);
    }

    public getDistance(to: Point): number {
        const vector = this.getDirectedVector(to);
        return vector.magnitude;
    }

    public toString(): string {
        return `Point(${this.x},${this.y})`;
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
