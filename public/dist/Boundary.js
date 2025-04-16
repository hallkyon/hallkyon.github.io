// @prettier
import Point from './Point.js';
import Vector from './Vector.js';
export default class Boundary {
    constructor(x = 0, y = 0, appearance) {
        this._center = new Point(0, 0);
        this._radius = 10;
        this._center = new Point(x, y);
        this._appearance = appearance;
        this._appearance.show(true);
        this._appearance.center = this._center;
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
        this._appearance.center = newCenter;
    }
    get radius() {
        return this._radius;
    }
    set radius(newRadius) {
        this._radius = newRadius;
        this._appearance.radius = newRadius;
    }
}
