// @prettier
import Vector from './Vector.js';
export default class Boundary {
    constructor(center) {
        this._radius = 1;
        this._center = center;
    }
    isInside(point) {
        const distance = new Vector(point.x - this._center.x, point.y - this._center.y).magnitude;
        return distance <= this._radius;
    }
    get center() {
        return this._center;
    }
    set center(newCenter) {
        this._center = newCenter;
    }
    get radius() {
        return this._radius;
    }
    set radius(newRadius) {
        this._radius = newRadius;
    }
}
