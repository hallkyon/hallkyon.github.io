// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Graph from '../src/Graph.ts';

let graph: Graph<number>;

describe('Graph', () => {
    beforeEach(() => {
        graph = new Graph();
    });

    it('should initialize Graph with empty vertices and edges containers', () => {
        expect(graph.vertices).toStrictEqual([]);
        expect(graph.edges).toStrictEqual([]);
    });

    it('should add two vertices', () => {
        graph.insertVertex(1);
        graph.insertVertex(2);
        expect(graph.vertices).toStrictEqual([1, 2]);
    });

    it('should throw an error if connecting to vertexA, which is not in graph', () => {
        graph.insertVertex(2);
        expect(() => graph.insertDirectedEdge(1, 2)).toThrowError();
    });

    it('should throw an error if connecting to vertexB, which is not in graph', () => {
        graph.insertVertex(1);
        expect(() => graph.insertDirectedEdge(1, 2)).toThrowError();
    });

    it('should add two edges if an undirected edge is added', () => {
        graph.insertVertex(1);
        graph.insertVertex(2);
        graph.insertUndirectedEdge(1, 2);
        expect(graph.edges).toStrictEqual([
            [1, 2],
            [2, 1],
        ]);
    });

    it('should add one edge if a directed edge is added', () => {
        graph.insertVertex(1);
        graph.insertVertex(2);
        graph.insertDirectedEdge(1, 2);
        expect(graph.edges).toStrictEqual([[1, 2]]);
    });

    it('should throw an error while getting adjacent vertices, if vertex is not in graph', () => {
        expect(() => graph.getAdjacentVertices(2)).toThrowError();
    });

    it('should return all adjacent vertices to v', () => {
        graph.insertVertex(1);
        graph.insertVertex(2);
        graph.insertDirectedEdge(1, 2);
        expect(graph.getAdjacentVertices(1)).toStrictEqual([2]);
        expect(graph.getAdjacentVertices(2)).toStrictEqual([]);
    });

    it('should throw an error while getting non-adjacent vertices, if vertex is not in graph', () => {
        expect(() => graph.getNonAdjacentVertices(2)).toThrowError();
    });

    it('should return all non adjacent vertices to v', () => {
        graph.insertVertex(1);
        graph.insertVertex(2);
        graph.insertDirectedEdge(1, 2);
        expect(graph.getNonAdjacentVertices(1)).toStrictEqual([]);
        expect(graph.getNonAdjacentVertices(2)).toStrictEqual([1]);
    });
});
