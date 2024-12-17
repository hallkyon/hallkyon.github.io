// @prettier

// polygon: array of points

function getEdges(polygon) {
    const edges = [];
    for (let i = 0; i < polygon.length; i++) {
        const vertexA = polygon[i];
        const vertexB = polygon[(i + 1) % polygon.length];
        edges.push({
            vertexA: vertexA,
            vertexB: vertexB,
        });
    }
    return edges;
}

function isIntersecting(edge, point) {
    const ax = edge.vertexA.x;
    const ay = edge.vertexA.y;
    const bx = edge.vertexB.x;
    const by = edge.vertexB.y;

    // definitely no intersection with edge
    if ((point.y < ay && point.y < by) || (point.y > ay && point.y > by)) {
        return null;
    }

    if (by === ay) {
        return false;
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
        console.log(edge);
        if (isIntersecting(edge, point)) {
            intersections++;
        }
    }

    const result = isOdd(intersections);
    console.log(result);
    return result;
}
