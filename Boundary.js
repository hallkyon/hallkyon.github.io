// @prettier

class Boundary {
    constructor(endpoints) {
        this.endpoints = endpoints;
    }

    draw() {
        const svg = document.getElementById('svg');
        const namespace = 'http://www.w3.org/2000/svg';
        const shape = 'polygon';
        const body = document.createElementNS(namespace, shape);

        // <polygon points="0,100 50,25, 50,75 100,0" />
        const points = this.endpoints
            .map((point) => `${point.x},${point.y}`)
            .join(' ');
        const strokeColor = 'white';

        body.setAttribute('points', points);
        body.setAttribute('stroke', strokeColor);
        body.setAttribute('fill', 'none');
        svg.appendChild(body);
        return body;
    }
}
