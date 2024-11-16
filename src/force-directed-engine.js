// @prettier

const stiffness = 0.001;
const repulsion = 0.00001;
const damping = 0.9;

function updatePositions(vertices) {
    if (!Array.isArray(vertices)) {
        throw new Error(`Invalid parameter (${typeof vertices})`);
    }

    vertices.forEach((vertex) => {
        vertex.x += vertex.vx;
        vertex.y += vertex.vy;
    });
}

function applyForces(vertices, edges) {
    if (!Array.isArray(vertices)) {
        throw new Error(`Invalid parameter (${typeof vertices})`);
    }

    if (!Array.isArray(edges)) {
        throw new Error(`Invalid parameter (${typeof edges})`);
    }

    vertices.forEach((vertex) => {
        applyRepulsiveForces(vertices, vertex);
        applyAttractionForces(edges, vertex);
        applyDamping(vertex);
    });
}

// Apply repulsive force to a vertex from all other vertices
function applyRepulsiveForces(vertices, vertexA) {
    if (!Array.isArray(vertices)) {
        throw new Error(`Invalid parameter (${typeof vertices})`);
    }

    vertices.forEach((vertexB) => {
        if (vertexA === vertexB) {
            return; // Skip self interaction
        }

        const distance = calculateDistance(vertexA, vertexB);
        const angle = calculateAngle(vertexA, vertexB);

        const repulsionForce = repulsion / (distance * distance);

        vertexA.vx -= repulsionForce * Math.cos(angle);
        vertexA.vy -= repulsionForce * Math.sin(angle);
    });
}

// Apply spring attraction force between connected vertices
function applyAttractionForces(edges, vertexA) {
    if (!Array.isArray(edges)) {
        throw new Error(`Invalid parameter (${typeof edges})`);
    }

    edges.forEach(([A, B]) => {
        if (A != vertexA) {
            // if the first vertex is not vertexA, then skip
            return;
        }
        if (B === vertexA) {
            // if the second vertex is vertexA then skip to avoid self interaction
            return;
        }
        const vertexB = B;

        const distance = calculateDistance(vertexA, vertexB);
        const angle = calculateAngle(vertexA, vertexB);

        const springForce = (distance - 150) * stiffness; // 150 is the desired spring length

        vertexA.vx += springForce * Math.cos(angle);
        vertexA.vy += springForce * Math.sin(angle);
    });
}

// Apply damping to reduce the velocity of a vertex over time
function applyDamping(vertex) {
    vertex.vx *= damping;
    vertex.vy *= damping;
}

// Calculate the angle between two vertices
function calculateAngle(vertexA, vertexB) {
    return Math.atan2(vertexB.y - vertexA.y, vertexB.x - vertexA.x);
}

// Calculate the Euclidean distance between two vertices
function calculateDistance(vertexA, vertexB) {
    const dx = vertexB.x - vertexA.x;
    const dy = vertexB.y - vertexA.y;
    return Math.sqrt(dx * dx + dy * dy);
}
