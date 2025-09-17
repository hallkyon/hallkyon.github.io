import type PointInterface from './PointInterface';
import type DrawingInterface from './DrawingInterface';

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
