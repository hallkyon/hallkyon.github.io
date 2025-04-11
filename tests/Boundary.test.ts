// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Boundary from '../src/Boundary.ts';
import Point from '../src/Point.ts';

let boundary: Boundary;

describe('Vector', () => {
    beforeEach(() => {
        boundary = new Boundary(new Point(0, 0));
    });

    it('should return the center', () => {
        expect(boundary.center.x).toStrictEqual(0);
        expect(boundary.center.y).toStrictEqual(0);
        boundary.center = new Point(5, 5);
        expect(boundary.center.x).toStrictEqual(5);
        expect(boundary.center.y).toStrictEqual(5);
    });

    it('should return the radius', () => {
        expect(boundary.radius).toStrictEqual(1);
        boundary.radius = 5;
        expect(boundary.radius).toStrictEqual(5);
    });

    it('should return true if a point mass is inside the boundary', () => {
        expect(boundary.isInside(new Point(0, 0))).toStrictEqual(true);
        expect(boundary.isInside(new Point(5, 5))).toStrictEqual(false);
    });
});
