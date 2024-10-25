// @prettier
import Vector from './Vector.js';
export default class Point {
    constructor(x, y) {
        if (false === isFinite(x) || false === isFinite(y)) {
            throw new Error(`Point constructor failed: Invalid arguments: ${x}, ${y}`);
        }
        this._x = x;
        this._y = y;
    }
    getDirection(to) {
        const vectorA = new Vector(this.x, this.y);
        const vectorB = new Vector(to.x, to.y);
        return vectorB.sub(vectorA).toUnitVector();
    }
    getDistance(to) {
        const vectorA = new Vector(this.x, this.y);
        const vectorB = new Vector(to.x, to.y);
        return vectorB.sub(vectorA).magnitude;
    }
    offset(offset) {
        this.x = this.x + offset.x;
        this.y = this.y + offset.y;
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
