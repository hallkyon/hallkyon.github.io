// @prettier

import { Vector } from './Vector.js';
import { Boundary } from './Boundary.js';
import { isInside } from './ray-casting.js';

function main() {
    const margin = 50;
    const polygon = new Boundary([
        { x: 100, y: 100 },
        { x: 400, y: 100 },
        { x: 400, y: 400 },
        { x: 300, y: 300 },
        { x: 200, y: 300 },
        { x: 200, y: 400 },
        { x: 100, y: 400 },
    ]);
    polygon.draw();

    const points = [
        new Vector(400, 400),
        new Vector(400, 200),
        new Vector(400, 100),
        new Vector(300, 400),
        new Vector(300, 300),
        new Vector(300, 200),
        new Vector(300, 100),
        new Vector(300, 0),
        new Vector(100, 200),
        new Vector(100, 400),
        new Vector(100, 100),
        new Vector(0, 400),
        new Vector(0, 300),
        new Vector(0, 200),
        new Vector(0, 100),
    ];
    for (const point of points) {
        point.draw();
    }
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
