// @prettier
import Point from './Point.js';
import Vector from './Vector.js';
export default class PointMass {
    constructor(x, y, appearance) {
        this._position = new Point(x, y);
        this._force = new Vector(0, 0);
        this._appearance = appearance;
        this._appearance.show(true);
    }
    getDirection(to) {
        return this.position.getDirection(to);
    }
    getDistance(to) {
        return this.position.getDistance(to);
    }
    applyForce() {
        const newPosition = new Point(this.position.x + this.force.x, this.position.y + this.force.y);
        this.position = newPosition;
        return this.position;
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
