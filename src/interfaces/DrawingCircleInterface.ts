// @prettier

import PointInterface from './PointInterface.js';
import DrawingInterface from './DrawingInterface.js';

export default interface DrawingCircleInterface extends DrawingInterface {
    get x(): number;
    set x(newX: number);
    get y(): number;
    set y(newY: number);
    get radius(): number;
    set radius(newRadius: number);
    get position(): PointInterface;
    set position(newPosition: PointInterface);
}
