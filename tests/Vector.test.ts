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

    it('should throw an error when creating a Vector with invalid arguments', () => {
        expect(() => new Vector(NaN, 0)).toThrow(
            'Vector constructor failed: Invalid arguments: NaN, 0'
        );
        expect(() => new Vector(0, NaN)).toThrow(
            'Vector constructor failed: Invalid arguments: 0, NaN'
        );
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

    it('should throw an error when trying to scale a vector with an invalid argument', () => {
        expect(() => vectorA.scale(NaN)).toThrow(
            'Vector scale failed: Invalid argument: NaN'
        );
    });

    it('should return a unit vector', () => {
        const newVector = vectorA.toUnitVector();
        expect(newVector.x).toStrictEqual(1 / Math.sqrt(2));
        expect(newVector.y).toStrictEqual(-1 / Math.sqrt(2));
    });

    it('should throw an error when trying to convert a zero vector to a unit vector', () => {
        const zeroVector = new Vector(0, 0);
        expect(() => zeroVector.toUnitVector()).toThrow(
            'Cannot convert a zero vector to a unit vector'
        );
    });

    it('should return the dot product of two vectors', () => {
        const dotProduct = vectorA.dotProduct(vectorB);
        expect(dotProduct).toStrictEqual(-10);
    });

    it('should return the projection of vectorB onto vectorA', () => {
        const projection = vectorA.projection(vectorB);
        expect(projection.x).toStrictEqual(5);
        expect(projection.y).toStrictEqual(-1.25);
    });

    it('should throw an error when trying to project a zero vector', () => {
        const zeroVector = new Vector(0, 0);
        expect(() => zeroVector.projection(vectorA)).toThrow(
            'Cannot project a zero vector'
        );
    });
});
