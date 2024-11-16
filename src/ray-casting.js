// @prettier

// Ray casting alogrithm to determine whether a point is inside a polygon or
// outside of if. A horizontal ray is casted from the point in question to
// infinity. If the point should lie on a edge or a node, then the result is
// going to be false.

// polygon: array of points
function getEdges(polygon) {
    const edges = [];
    for (let i = 0; i < polygon.length; i++) {
        const vertexA = polygon[i];
        const vertexB = polygon[(i + 1) % polygon.length];
        edges.push({
            A: vertexA,
            B: vertexB,
        });
    }
    return edges;
}

function isIntersecting(edge, point) {
    const ax = edge.A.x;
    const ay = edge.A.y;
    const bx = edge.B.x;
    const by = edge.B.y;

    // definitely no intersection with edge
    if ((point.y <= ay && point.y <= by) || (point.y >= ay && point.y >= by)) {
        return null;
    }

    if (by === ay) {
        if ((point.x > ax && point.x > bx) || (point.x < ax && point.x < bx)) {
            return false;
        } else {
            return true;
        }
    }

    const gradient = (bx - ax) / (by - ay);
    const intersectionX = gradient * (point.y - ay) + ax;

    return intersectionX > point.x;
}

function isOdd(value) {
    return value % 2 ? true : false;
}

export function isInside(polygon, point) {
    let intersections = 0;
    const edges = getEdges(polygon);

    for (const edge of edges) {
        if (isIntersecting(edge, point)) {
            intersections++;
        }
    }

    return isOdd(intersections);
}
