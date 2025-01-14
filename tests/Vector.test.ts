// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Vector from '../src/Vector.ts';

let vectorA: Vector;
let vectorB: Vector;

describe('Vector', () => {
    beforeEach(() => {
        vectorA = new Vector(2, -2);
        vectorB = new Vector(-4, 1);
    });

    it('should create a Vector', () => {
        expect(vectorA.x).toStrictEqual(2);
        expect(vectorA.y).toStrictEqual(-2);
    });

    it('should give back the magnitude', () => {
        expect(vectorA.magnitude).toStrictEqual(Math.sqrt(8));
    });

    it('should add two vectors', () => {
        const newVector = vectorA.add(vectorB);
        expect(newVector.x).toStrictEqual(-2);
        expect(newVector.y).toStrictEqual(-1);
    });

    it('should subtract two vectors', () => {
        const newVector = vectorA.sub(vectorB);
        expect(newVector.x).toStrictEqual(6);
        expect(newVector.y).toStrictEqual(-3);
    });

    it('should scale a vector', () => {
        const newVector = vectorA.scale(2);
        expect(newVector.x).toStrictEqual(4);
        expect(newVector.y).toStrictEqual(-4);
    });

    it('should return a unit vector', () => {
        const newVector = vectorA.toUnitVector();
        expect(newVector.x).toStrictEqual(1 / Math.sqrt(2));
        expect(newVector.y).toStrictEqual(-1 / Math.sqrt(2));
    });
});
