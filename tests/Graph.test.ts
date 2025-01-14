// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import Graph from '../src/Graph.ts';

class Dummy {
    constructor(id: string) {
        this.id = id;
    }
}

let graph: Graph;

describe('Graph', () => {
    beforeEach(() => {
        graph = new Graph();
    });

    it('should initialize Graph with empty vertices and edges containers', () => {
        expect(graph.vertices).toStrictEqual([]);
        expect(graph.edges).toStrictEqual([]);
    });

    it('should add a vertex', () => {
        const dummy = new Dummy('vertex');
        graph.insertVertex(dummy);
        expect(graph.vertices).toStrictEqual([dummy]);
    });

    it('should add two vertices as endpoints if an edge is added', () => {
        const dummy1 = new Dummy('1');
        const dummy2 = new Dummy('2');
        graph.insertUndirectedEdge(dummy1, dummy2);
        expect(graph.vertices).toStrictEqual([dummy1, dummy2]);
    });

    it('should add two edges if an undirected edge is added', () => {
        const dummy1 = new Dummy('1');
        const dummy2 = new Dummy('2');
        graph.insertUndirectedEdge(dummy1, dummy2);
        expect(graph.edges).toStrictEqual([
            [dummy1, dummy2],
            [dummy2, dummy1],
        ]);
        expect(graph.vertices).toStrictEqual([dummy1, dummy2]);
    });

    it('should add one edge if a directed edge is added', () => {
        const dummy1 = new Dummy('1');
        const dummy2 = new Dummy('2');
        graph.insertDirectedEdge(dummy1, dummy2);
        expect(graph.edges).toStrictEqual([[dummy1, dummy2]]);
        expect(graph.vertices).toStrictEqual([dummy1, dummy2]);
    });

    it('should return all adjacent vertices to v', () => {
        const dummy1 = new Dummy('1');
        const dummy2 = new Dummy('2');
        graph.insertDirectedEdge(dummy1, dummy2);
        expect(graph.getAdjacentVertices(dummy1)).toStrictEqual([dummy2]);
        expect(graph.getAdjacentVertices(dummy2)).toStrictEqual([]);
    });

    it('should return all non adjacent vertices to v', () => {
        const dummy1 = new Dummy('1');
        const dummy2 = new Dummy('2');
        graph.insertDirectedEdge(dummy1, dummy2);
        expect(graph.getNonAdjacentVertices(dummy1)).toStrictEqual([]);
        expect(graph.getNonAdjacentVertices(dummy2)).toStrictEqual([dummy1]);
    });
});
