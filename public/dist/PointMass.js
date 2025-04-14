// @prettier
import Point from './Point.js';
import Vector from './Vector.js';
export default class PointMass {
    constructor(x = 0, y = 0, appearance) {
        this._position = new Point(0, 0);
        this._force = new Vector(0, 0);
        this._appearance = appearance;
        this._appearance.show(true);
        this.position = new Point(x, y);
    }
    getDirection(to) {
        return this.position.getDirection(to);
    }
    getDistance(to) {
        return this.position.getDistance(to);
    }
    get position() {
        return this._position;
    }
    set position(newPosition) {
        this._position = newPosition;
        this._appearance.position = newPosition;
    }
    get force() {
        return this._force;
    }
    set force(newForce) {
        this._force = newForce;
    }
}
