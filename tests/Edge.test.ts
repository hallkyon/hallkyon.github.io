// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Edge from '../src/Edge.js';
import Vertex from '../src/Vertex.js';

let edge: Edge;

describe('Edge', () => {
    beforeEach(() => {
        const vertexA = new Vertex(null);
        const vertexB = new Vertex(null);
        edge = new Edge(vertexA, vertexB);
    });

    it('should set and give back vertexA', () => {
        const newVertexA = new Vertex(null);
        edge.vertexA = newVertexA;
        expect(edge.vertexA).toStrictEqual(newVertexA);
    });

    it('should set and give back vertexB', () => {
        const newVertexB = new Vertex(null);
        edge.vertexB = newVertexB;
        expect(edge.vertexB).toStrictEqual(newVertexB);
    });
});
