// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Matrix from '../src/Matrix.ts';

let matrix: Matrix;

describe('Matrix', () => {
    beforeEach(() => {
        matrix = new Matrix(3, 2);
    });

    it('should create a Matrix', () => {
        expect(matrix.numRows).toStrictEqual(3);
        expect(matrix.numColumns).toStrictEqual(2);
    });

    it('should throw an error accessing with negative indices', () => {
        expect(() => matrix.getValue(-1, 0)).toThrow();
        expect(() => matrix.getValue(0, -1)).toThrow();
    });

    it('should throw an error accessi^g with non-integer indices', () => {
        expect(() => matrix.getValue(0.5, 0)).toThrow();
        expect(() => matrix.getValue(0, 0.5)).toThrow();
        expect(() => matrix.setValue(0.5, 0, 0)).toThrow();
        expect(() => matrix.setValue(0, 0.5, 0)).toThrow();
    });

    it('should stringify the matrix', () => {
        const expected = ['0 0', '0 0', '0 0'].join('\n');
        expect(matrix.toString()).toStrictEqual(expected);
    });

    it('should set 1,1 to 3', () => {
        matrix.setValue(1, 1, 3);
        const expected = ['0 0', '0 3', '0 0'].join('\n');
        expect(matrix.getValue(1, 1)).toStrictEqual(3);
        expect(matrix.toString()).toStrictEqual(expected);
    });
});
