import PointInterface from './PointInterface.js';
import DrawingInterface from './DrawingInterface.js';

export default interface DrawingRectInterface extends DrawingInterface {
    get x(): number;
    set x(newX: number);
    get y(): number;
    set y(newY: number);
    get width(): number;
    set width(newWidth: number);
    get height(): number;
    set height(newHeight: number);
    get position(): PointInterface;
    set position(newPosition: PointInterface);
}
