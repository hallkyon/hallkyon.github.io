// @prettier

export default interface VectorInterface {
    add(vector: VectorInterface): VectorInterface;
    sub(vector: VectorInterface): VectorInterface;
    scale(scalar: number): VectorInterface;
    toUnitVector(): VectorInterface;
    dotProduct(vector: VectorInterface): number;
    projection(vector: VectorInterface): VectorInterface;
    get magnitude(): number;
    get x(): number;
    set x(newX: number);
    get y(): number;
    set y(newY: number);
}
