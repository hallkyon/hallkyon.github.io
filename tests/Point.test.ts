// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Vector from '../src/Vector.ts';
import Point from '../src/Point.ts';

let pointA;
let pointB;

describe('Point', () => {
    beforeEach(() => {
        pointA = new Point(0, 0);
        pointB = new Point(2, 2);
    });

    it('should create a Vector', () => {
        expect(pointB.x).toStrictEqual(2);
        expect(pointB.y).toStrictEqual(2);
    });

    it('should return the direction to pointB', () => {
        const direction = pointA.getDirection(pointB);
        expect(direction.x).toStrictEqual(1 / Math.sqrt(2));
        expect(direction.y).toStrictEqual(1 / Math.sqrt(2));
    });

    it('should return the distance to pointB', () => {
        const distance = pointA.getDistance(pointB);
        expect(distance).toStrictEqual(Math.sqrt(8));
    });
});
