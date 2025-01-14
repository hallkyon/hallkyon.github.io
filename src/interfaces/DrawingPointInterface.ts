// @prettier

import DrawingInterface from './DrawingInterface.js';

export default interface DrawingPointInterface extends DrawingInterface {
    set x(newX: number);
    set y(newY: number);
}
