// @prettier

import PointInterface from './PointInterface.js';
import VectorInterface from './VectorInterface.js';

export default interface PointMassInterface {
    getDirection(to: PointMassInterface): VectorInterface;
    getDistance(to: PointMassInterface): number;
    get position(): PointInterface;
    set position(newPosition: PointInterface);
    get force(): VectorInterface;
    set force(newForce: VectorInterface);
}
