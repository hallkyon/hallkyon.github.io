// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import PointMass from '../src/PointMass.ts';

let pointMassA;
let pointMassB;

describe('Point', () => {
    beforeEach(() => {
        pointMassA = new PointMass(1, 2);
        pointMassB = new PointMass(2, 1);
    });

    it('should create a Vector', () => {
        expect(pointMassA.x).toStrictEqual(1);
        expect(pointMassA.y).toStrictEqual(2);
    });

    it('should set and give back the x and y coordinates', () => {
        pointMassA.x = 2;
        expect(pointMassA.x).toStrictEqual(2);
        pointMassA.y = 1;
        expect(pointMassA.y).toStrictEqual(1);
    });

    it('should set and give back the position', () => {
        pointMassA.position = { x: 3, y: 4 };
        expect(pointMassA.position.x).toStrictEqual(3);
        expect(pointMassA.position.y).toStrictEqual(4);
    });

    it('should set and give back the force', () => {
        pointMassA.force = { x: 5, y: 6 };
        expect(pointMassA.force.x).toStrictEqual(5);
        expect(pointMassA.force.y).toStrictEqual(6);
    });

    it('should give back the direction to pointMassB', () => {
        const direction = pointMassA.getDirection(pointMassB);
        expect(direction.x).toStrictEqual(1 / Math.sqrt(2));
        expect(direction.y).toStrictEqual(-1 / Math.sqrt(2));
    });

    it('should give back the distance to pointMassB', () => {
        const distance = pointMassA.getDistance(pointMassB);
        expect(distance).toStrictEqual(Math.sqrt(2));
    });
});
