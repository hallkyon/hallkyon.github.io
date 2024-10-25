// @prettier
const stiffness = 0.01;
const repulsion = 1000;
const damping = 0.9;
export function updatePositions(vertices, edges) {
    applyForces(vertices, edges);
    vertices.forEach((vertex) => {
        vertex.x += vertex.vx;
        vertex.y += vertex.vy;
    });
}
function applyForces(vertices, edges) {
    vertices.forEach((vertex) => {
        applyRepulsiveForces(vertices, vertex);
        applyAttractionForces(edges, vertex);
        applyDamping(vertex);
    });
}
// Apply repulsive force to a vertex from all other vertices
function applyRepulsiveForces(vertices, vertexA) {
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
    edges.forEach((edge) => {
        const A = edge.pointA;
        const B = edge.pointB;
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
        // TODO: This should be somewhere else
        edge.pointA = vertexA;
        edge.pointB = vertexB;
        vertexA.vx += springForce * Math.cos(angle);
        vertexA.vy += springForce * Math.sin(angle);
    });
}
export function applyPointerAttractionForce(vertices, pointerLocation) {
    if (pointerLocation === undefined) {
        return;
    }
    vertices.forEach((vertex) => {
        const distance = calculateDistance(vertex, pointerLocation);
        const angle = calculateAngle(vertex, pointerLocation);
        const springForce = (distance - 0) * 0.01;
        vertex.vx += springForce * Math.cos(angle);
        vertex.vy += springForce * Math.sin(angle);
    });
}
// Apply damping to reduce the velocity of a vertex over time
function applyDamping(vertex) {
    vertex.vx *= damping;
    vertex.vy *= damping;
}
// Calculate the angle between two vertices
function calculateAngle(A, B) {
    return Math.atan2(B.y - A.y, B.x - A.x);
}
// Calculate the Euclidean distance between two vertices
function calculateDistance(A, B) {
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    return Math.sqrt(dx * dx + dy * dy);
}
