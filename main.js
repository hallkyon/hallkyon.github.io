// @prettier

import { Vector } from './Vector.js';
import { Boundary } from './Boundary.js';

function main() {
    const margin = 50;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const boundary = new Boundary([
        new Vector(0 + margin, 0 + margin),
        new Vector(width - margin, 0 + margin),
        new Vector(width - margin, height - margin),
        new Vector(0 + margin, height - margin),
    ]);
    boundary.draw();
}

window.addEventListener('load', main);

/*
import { Vertex } from './Vertex.js';
import { Boundary } from './Boundary.js';

const vertices = [];
const edges = [];

function animate(timestamp, vertices, edges) {
    applyForces(vertices, edges);
    updatePositions(vertices);

    requestAnimationFrame((timestamp) => {
        animate(timestamp, vertices, edges);
    });
}

function main() {
    const margin = 50;
    const width = window.innerWidth - margin;
    const height = window.innerHeight - margin;
    const boundary = new Boundary([
        new Vector(margin, margin),
        new Vector(width, margin),
        new Vector(width, height),
        new Vector(margin, height),
    ]);
    boundary.draw();

    // Make some vertices
    for (let i = 0; i < 100; i++) {
        const x = width * Math.random();
        const y = height * Math.random();
        const vertex = new Vertex(x, y);
        vertices.push(vertex);
    }

    // Make some edges
    vertices.forEach((vertexA) => {
        vertices.forEach((vertexB) => {
            if (vertexA === vertexB) {
                return;
            }
            edges.push([vertexA, vertexB]);
        });
    });

    if (!Array.isArray(vertices)) {
        throw new Error('Error: vertices is not an array');
    }
    if (!Array.isArray(edges)) {
        throw new Error('Error: edges is not an array');
    }

    animate(0, vertices, edges);
}
*/
