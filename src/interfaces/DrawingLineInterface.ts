// @prettier

import DrawingInterface from './DrawingInterface.js';
import PointInterface from './PointInterface.js';

export default interface DrawingLineInterface extends DrawingInterface {
    get pointA(): PointInterface;
    set pointA(newPointInterface: PointInterface);
    get pointB(): PointInterface;
    set pointB(newPointInterface: PointInterface);
}
