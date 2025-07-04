// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Point from '../src/Point.ts';

let pointA;
let pointB;

describe('Point', () => {
    beforeEach(() => {
        pointA = new Point(1, -1);
        pointB = new Point(2, 2);
    });

    it('should create a Vector', () => {
        expect(pointB.x).toStrictEqual(2);
        expect(pointB.y).toStrictEqual(2);
    });

    it('should set and give back the x and y coordinates', () => {
        pointA.x = 1;
        expect(pointA.x).toStrictEqual(1);
        pointA.y = 1;
        expect(pointA.y).toStrictEqual(1);
    });

    it('should throw an error when creating a Point with invalid arguments', () => {
        expect(() => new Point(NaN, 0)).toThrow(
            'Point constructor failed: Invalid arguments: NaN, 0'
        );
        expect(() => new Point(0, NaN)).toThrow(
            'Point constructor failed: Invalid arguments: 0, NaN'
        );
    });

    it('should return the position vector of pointA', () => {
        const positionVector = pointA.getPositionVector();
        expect(positionVector.x).toStrictEqual(1);
        expect(positionVector.y).toStrictEqual(-1);
    });

    it('should return the directed vector from pointA to pointB', () => {
        const directedVector = pointA.getDirectedVector(pointB);
        expect(directedVector.x).toStrictEqual(1);
        expect(directedVector.y).toStrictEqual(3);
    });

    it('should return the distance to pointB', () => {
        const distance = pointA.getDistance(pointB);
        expect(distance).toStrictEqual(Math.sqrt(10));
    });

    it('should stringify the object', () => {
        expect(pointA.toString()).toStrictEqual('Point(1,-1)');
    });
});
