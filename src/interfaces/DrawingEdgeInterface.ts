import type DrawingInterface from './DrawingInterface';
import type PointInterface from './PointInterface';

export default interface DrawingLineInterface extends DrawingInterface {
    get pointA(): PointInterface;
    set pointA(newPointInterface: PointInterface);
    get pointB(): PointInterface;
    set pointB(newPointInterface: PointInterface);
}
