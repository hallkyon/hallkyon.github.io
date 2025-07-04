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
    getPositionVector() {
        return new Vector(this.x, this.y);
    }
    getDirectedVector(to) {
        const vectorA = this.getPositionVector();
        const vectorB = to.getPositionVector();
        return vectorB.sub(vectorA);
    }
    getDistance(to) {
        const vector = this.getDirectedVector(to);
        return vector.magnitude;
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
    toString() {
        return `Point(${this.x},${this.y})`;
    }
}
//# sourceMappingURL=Point.js.map