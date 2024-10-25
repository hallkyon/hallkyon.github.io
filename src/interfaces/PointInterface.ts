// @prettier

import VectorInterface from 'VectorInterface.js';

export default interface PointInterface {
    getDirection(to: PointInterface): VectorInterface;
    getDistance(to: PointInterface): number;
    offset(offset: VectorInterface): void;
    get x(): number;
    set x(newX: number);
    get y(): number;
    set y(newY: number);
}
