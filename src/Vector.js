// @prettier

export class Vector {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    draw() {
        const svg = document.getElementById('svg');
        const namespace = 'http://www.w3.org/2000/svg';
        const svgElement = 'circle';
        const svgPoint = document.createElementNS(namespace, svgElement);

        const fillColor = 'white';
        const radius = 2;

        svgPoint.setAttribute('cx', this.#x);
        svgPoint.setAttribute('cy', this.#y);
        svgPoint.setAttribute('r', radius);
        svgPoint.setAttribute('stroke', 'none');
        svgPoint.setAttribute('fill', fillColor);
        svg.appendChild(svgPoint);
        return svgPoint;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}
