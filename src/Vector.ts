// @prettier

import VectorInterface from './interfaces/VectorInterface.js';

export default class Vector implements VectorInterface {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        if (false === isFinite(x) || false === isFinite(y)) {
            throw new Error(
                `Vector constructor failed: Invalid arguments: ${x}, ${y}`
            );
        }
        this._x = x;
        this._y = y;
    }

    public add(vector: Vector): Vector {
        return new Vector(vector.x + this.x, vector.y + this.y);
    }

    public sub(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    public scale(scalar: number): this {
        if (false === isFinite(scalar)) {
            throw new Error(`Vector scale failed: Invalid argument: ${scalar}`);
        }
        this.x = scalar * this.x;
        this.y = scalar * this.y;
        return this;
    }

    public toUnitVector(): this {
        if (this.isZeroVector()) {
            throw new Error('Cannot convert a zero vector to a unit vector');
        }
        const magnitude = this.magnitude;
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
        return this;
    }

    public dotProduct(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public projection(vector: Vector): Vector {
        if (this.isZeroVector()) {
            throw new Error('Cannot project a zero vector');
        }
        return vector.scale(this.dotProduct(vector) / this.dotProduct(this));
    }

    private isZeroVector(): boolean {
        return this.x === 0 && this.y === 0;
    }

    public get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
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
