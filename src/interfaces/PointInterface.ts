import type VectorInterface from './VectorInterface';

export default interface PointInterface {
    getDirectedVector(to: PointInterface): VectorInterface;
    getDistance(to: PointInterface): number;
    get x(): number;
    set x(newX: number);
    get y(): number;
    set y(newY: number);
}
