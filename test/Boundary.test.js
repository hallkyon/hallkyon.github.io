// @prettier

import { strictEqual } from 'assert';
import { Boundary } from '../Boundary.js';

describe('Boundary', () => {
    let boundary;

    before(() => {
        boundary = new Boundary([
            { x: 0, y: 0 },
            { x: 5, y: 0 },
            { x: 5, y: 5 },
            { x: 0, y: 5 },
        ]);
    });

    it('should return false if point is outside the boundary', () => {
        const point = { x: 6, y: 6 };
        const result = boundary.isInside(point);
        strictEqual(result, false);
    });

    it('should return true if point is inside the boundary', () => {
        const point = { x: 2, y: 2 };
        const result = boundary.isInside(point);
        strictEqual(result, true);
    });

    it('should return true if point is exactly on an edge', () => {
        const point = { x: 5, y: 2.5 };
        const result = boundary.isInside(point);
        strictEqual(result, true);
    });

    it('should return true if point is exactly on a node', () => {
        const point = { x: 5, y: 5 };
        const result = boundary.isInside(point);
        strictEqual(result, true);
    });
});
