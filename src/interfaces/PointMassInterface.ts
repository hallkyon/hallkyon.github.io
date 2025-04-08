// @prettier

import PointInterface from './PointInterface.js';
import VectorInterface from './VectorInterface.js';

export default interface PointMassInterface {
    getDirection(to: PointInterface): VectorInterface;
    getDistance(to: PointInterface): number;
    get x(): number;
    set x(newX: number);
    get y(): number;
    set y(newY: number);
    get position(): PointInterface;
    set position(newPosition: PointInterface);
    get force(): VectorInterface;
    set force(newForce: VectorInterface);
}
