import Matrix from './Matrix';

export default class Vector {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        if (false === Number.isFinite(x) || false === Number.isFinite(y)) {
            throw new TypeError(
                `Vector constructor failed: Invalid arguments: ${x}, ${y}`
            );
        }

        this._x = x;
        this._y = y;
    }

    private isZeroVector(): boolean {
        return this._x === 0 && this._y === 0;
    }

    public add(vector: Vector): this {
        this._x += vector.x;
        this._y += vector.y;
        return this;
    }

    public sub(vector: Vector): this {
        this._x -= vector.x;
        this._y -= vector.y;
        return this;
    }

    public scale(scalar: number): this {
        if (false === Number.isFinite(scalar)) {
            throw new TypeError(
                `Vector scale failed: Invalid argument: ${scalar}`
            );
        }
        this._x *= scalar;
        this._y *= scalar;
        return this;
    }

    public toUnitVector(): this {
        if (this.isZeroVector()) {
            throw new Error('Cannot convert a zero vector to a unit vector');
        }
        const magnitude = this.magnitude;
        this._x = this._x / magnitude;
        this._y = this._y / magnitude;
        return this;
    }

    public dotProduct(vector: Vector): number {
        return this._x * vector.x + this._y * vector.y;
    }

    public projectOn(nonZeroVector: Vector): Vector {
        if (this.isZeroVector()) {
            throw new Error('Cannot project a zero vector');
        }
        return nonZeroVector.scale(
            this.dotProduct(nonZeroVector) / this.dotProduct(this)
        );
    }

    public matrixMultiply(matrix: Matrix): this {
        if (matrix.numRows !== 2 || matrix.numColumns !== 2) {
            throw new Error(
                `Matrix must be 2x2 for vector transformation, got ${matrix.numRows}x${matrix.numColumns}`
            );
        }
        const x =
            this._x * matrix.getValue(0, 0) + this._y * matrix.getValue(0, 1);
        const y =
            this._x * matrix.getValue(1, 0) + this._y * matrix.getValue(1, 1);

        this._x = x;
        this._y = y;
        return this;
    }

    public get magnitude(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    public get x(): number {
        return this._x;
    }

    public set x(newX: number) {
        if (false === Number.isFinite(newX)) {
            throw new TypeError(`Invalid argument: ${newX}`);
        }
        this._x = newX;
    }

    public get y(): number {
        return this._y;
    }

    public set y(newY: number) {
        if (false === Number.isFinite(newY)) {
            throw new TypeError(`Invalid argument: ${newY}`);
        }
        this._y = newY;
    }

    public toString(): string {
        return `${this._x}\n${this._y}`;
    }
}
