// @prettier
import Point from './Point.js';
import Vector from './Vector.js';
export default class PointMass {
    constructor(x, y) {
        this._position = new Point(0, 0);
        this._force = new Vector(0, 0);
        this.position = new Point(x, y);
    }
    getDirection(to) {
        return this.position.getDirection(to.position);
    }
    getDistance(to) {
        return this.position.getDistance(to.position);
    }
    get x() {
        return this._position.x;
    }
    set x(newX) {
        this._position.x = newX;
    }
    get y() {
        return this._position.y;
    }
    set y(newY) {
        this._position.y = newY;
    }
    get position() {
        return this._position;
    }
    set position(newPosition) {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
    get force() {
        return this._force;
    }
    set force(newForce) {
        this._force = newForce;
    }
}
//# sourceMappingURL=PointMass.js.map