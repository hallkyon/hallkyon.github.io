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

    isInside(point) {
        return false;
    }

    get vertices() {
        return this.points;
    }
}
