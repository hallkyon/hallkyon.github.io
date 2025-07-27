// @prettier

import VectorInterface from './interfaces/VectorInterface.js';
import Matrix from './Matrix.js';

export default class Vector extends Matrix implements VectorInterface {
    constructor(x: number, y: number) {
        super(2, 1);

        if (false === isFinite(x) || false === isFinite(y)) {
            throw new Error(
                `Vector constructor failed: Invalid arguments: ${x}, ${y}`
            );
        }

        this.x = x;
        this.y = y;
    }

    private isZeroVector(): boolean {
        return this.x === 0 && this.y === 0;
    }

    public add(vector: Vector): this {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public sub(vector: Vector): this {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    public scale(scalar: number): this {
        if (false === isFinite(scalar)) {
            throw new Error(`Vector scale failed: Invalid argument: ${scalar}`);
        }
        this.x *= scalar;
        this.y *= scalar;
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

    public projectOn(nonZeroVector: Vector): Vector {
        if (this.isZeroVector()) {
            throw new Error('Cannot project a zero vector');
        }
        return nonZeroVector.scale(this.dotProduct(nonZeroVector) / this.dotProduct(this));
    }

    public matrixMultiply(matrix: Matrix): Vector {
        if (matrix.numRows !== 2 || matrix.numColumns !== 2) {
            throw new Error(
                `Matrix must be 2x2 for vector transformation, got ${matrix.numRows}x${matrix.numColumns}`
            );
        }
        const x = this.x * matrix.getValue(0, 0) + this.y * matrix.getValue(0, 1);
        const y = this.x * matrix.getValue(1, 0) + this.y * matrix.getValue(1, 1);
        return new Vector(x, y);
    }

    public get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public get x(): number {
        return this.getValue(0, 0);
    }

    public set x(newX: number) {
        this.setValue(0, 0, newX);
    }

    public get y(): number {
        return this.getValue(1, 0);
    }

    public set y(newY: number) {
        this.setValue(1, 0, newY);
    }
}
