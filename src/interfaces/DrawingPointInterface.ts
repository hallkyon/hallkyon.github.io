// @prettier

import PointInterface from './PointInterface.js';
import DrawingInterface from './DrawingInterface.js';

export default interface DrawingPointInterface extends DrawingInterface {
    set position(newPosition: PointInterface);
    set x(newX: number);
    set y(newY: number);
}
