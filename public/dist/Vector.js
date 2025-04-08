// @prettier
export default class Vector {
    constructor(x, y) {
        if (false === isFinite(x) || false === isFinite(y)) {
            throw new Error(`Vector constructor failed: Invalid arguments: ${x}, ${y}`);
        }
        this._x = x;
        this._y = y;
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
    isZeroVector() {
        return this.x === 0 && this.y === 0;
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get x() {
        return this._x;
    }
    set x(newX) {
        this._x = newX;
    }
    get y() {
        return this._y;
    }
    set y(newY) {
        this._y = newY;
    }
}
//# sourceMappingURL=Vector.js.map