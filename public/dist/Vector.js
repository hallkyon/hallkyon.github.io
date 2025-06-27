// @prettier
import Matrix from './Matrix.js';
export default class Vector extends Matrix {
    constructor(x, y) {
        super(2, 1);
        if (false === isFinite(x) || false === isFinite(y)) {
            throw new Error(`Vector constructor failed: Invalid arguments: ${x}, ${y}`);
        }
        this.x = x;
        this.y = y;
    }
    isZeroVector() {
        return this.x === 0 && this.y === 0;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    scale(scalar) {
        if (false === isFinite(scalar)) {
            throw new Error(`Vector scale failed: Invalid argument: ${scalar}`);
        }
        this.x *= scalar;
        this.y *= scalar;
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
    projectOn(nonZeroVector) {
        if (this.isZeroVector()) {
            throw new Error('Cannot project a zero vector');
        }
        return nonZeroVector.scale(this.dotProduct(nonZeroVector) / this.dotProduct(this));
    }
    matrixMultiply(matrix) {
        if (matrix.numRows !== 2 || matrix.numColumns !== 2) {
            throw new Error(`Matrix must be 2x2 for vector transformation, got ${matrix.numRows}x${matrix.numColumns}`);
        }
        const x = this.x * matrix.getValue(0, 0) + this.y * matrix.getValue(0, 1);
        const y = this.x * matrix.getValue(1, 0) + this.y * matrix.getValue(1, 1);
        return new Vector(x, y);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get x() {
        return this.getValue(0, 0);
    }
    set x(newX) {
        this.setValue(0, 0, newX);
    }
    get y() {
        return this.getValue(1, 0);
    }
    set y(newY) {
        this.setValue(1, 0, newY);
    }
}
//# sourceMappingURL=Vector.js.map