// @prettier

export class Boundary {
    constructor(points) {
        this.points = points;
    }

    draw() {
        const svg = document.getElementById('svg');
        const namespace = 'http://www.w3.org/2000/svg';
        const svgElement = 'polygon';
        const svgBoundary = document.createElementNS(namespace, svgElement);

        // points attribute format: <polygon points="0,0 100,0 100,100, 0,100" />
        const points = this.points
            .map((point) => `${point.x},${point.y}`)
            .join(' ');
        const strokeColor = 'white';

        svgBoundary.setAttribute('points', points);
        svgBoundary.setAttribute('stroke', strokeColor);
        svgBoundary.setAttribute('fill', 'none');
        svg.appendChild(svgBoundary);
        return svgBoundary;
    }

    #makeBoundingBox(points) {
        const topLeft = points[0];
        const bottomRight = points[3];
        return {
            x: topLeft.x,
            y: topLeft.y,
            width: topLeft.x + bottomRight.x,
            height: topLeft.y + bottomRight.y,
        };
    }

    #isInsideBox(point, box) {
        if (
            point.x > box.x &&
            point.x < box.x + box.width &&
            point.y > box.y &&
            point.y < box.y + box.height
        ) {
            return true;
        }
        return false;
    }

    isInside(point) {
        let intersections = 0;
        for (let i = 0; i < this.points.length; i++) {
            const endpointA = this.points[i];
            const endpointB = this.points[(i + 1) % this.points.length];
            // Does point lie between the y coordinate of the endpoint of the two
            // edges
            console.log(makeBoundingBox(this.points));
        }

        return false;
    }
}

