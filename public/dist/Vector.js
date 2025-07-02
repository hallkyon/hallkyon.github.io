// @prettier
import Matrix from './Matrix.js';
export default class Vector {
    constructor(x, y) {
        if (false === isFinite(x) || false === isFinite(y)) {
            throw new Error(`Vector constructor failed: Invalid arguments: ${x}, ${y}`);
        }
        this._data = new Matrix(2, 1);
        this.x = x;
        this.y = y;
    }
    isZeroVector() {
        return this.x === 0 && this.y === 0;
    }
    add(vector) {
        return new Vector(vector.x + this.x, vector.y + this.y);
    }
    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    scale(scalar) {
        if (false === isFinite(scalar)) {
            throw new Error(`Vector scale failed: Invalid argument: ${scalar}`);
        }
        this.x = scalar * this.x;
        this.y = scalar * this.y;
        return this;
    }
    toUnitVector() {
        if (this.isZeroVector()) {
            throw new Error('Cannot convert a zero vector to a unit vector');
        }
        const magnitude = this.magnitude;
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
        return this;
    }
    dotProduct(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    projection(vector) {
        if (this.isZeroVector()) {
            throw new Error('Cannot project a zero vector');
        }
        return vector.scale(this.dotProduct(vector) / this.dotProduct(this));
    }
    vectorMatrixMultiply(matrix) {
        try {
            if (matrix.rows != 2 || matrix.columns != 2) {
                throw new Error(`Vector matrix multiplication failed: Invalid matrix dimensions: ${matrix.rows}x${matrix.columns}`);
            }
            const newX = this.x * matrix.getValue(0, 0) + this.y * matrix.getValue(0, 1);
            const newY = this.x * matrix.getValue(1, 0) + this.y * matrix.getValue(1, 1);
            return new Vector(newX, newY);
        }
        catch (error) {
            throw new Error(`Vector matrix multiplication failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get x() {
        return this._data.getValue(0, 0);
    }
    set x(newX) {
        this._data.setValue(0, 0, newX);
    }
    get y() {
        return this._data.getValue(1, 0);
    }
    set y(newY) {
        this._data.setValue(1, 0, newY);
    }
    toString() {
        return `Vector(${this.x}, ${this.y})`;
    }
}
//# sourceMappingURL=Vector.js.map