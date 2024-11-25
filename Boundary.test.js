const Boundary = require('./Boundary.js');

describe('Boundary', () => {
    let boundary;

    beforeEach(() => {
        boundary = new Boundary([
            { x: 0, y: 0 },
            { x: 5, y: 0 },
            { x: 5, y: 5 },
            { x: 0, y: 5 },
        ]);
    });

    it('should return false if point is outside the boundary', () => {
        const point = { x: 6, y: 6 };
        expect(boundary.isInside(point).toBe(false));
    });

    it('should return true if point is inside the boundary', () => {
        const point = { x: 2, y: 2 };
        expect(boundary.isInside(point).toBe(true));
    });
});
