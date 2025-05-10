// @prettier

import VertexInterface from './VertexInterface.js';

export default interface EdgeInterface {
    get vertexA(): VertexInterface;
    set vertexA(newVertex: VertexInterface);
    get vertexB(): VertexInterface;
    set vertexB(newVertex: VertexInterface);
}
