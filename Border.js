class Border {
    constructor() {
        this._body = this.makeBody();
    }

    makeBody() {
        const canvas = document.getElementById("canvas");
        const namespace = "http://www.w3.org/2000/svg";
        const shape = "rect";
        const body = document.createElementNS(namespace, shape);

        const margin = 50;
        const height = window.innerHeight - margin;
        const width = window.innerWidth - margin;
        const stroke = "white";

        body.setAttribute("x", margin / 2);
        body.setAttribute("y", margin / 2);
        body.setAttribute("height", height);
        body.setAttribute("width", width);
        body.setAttribute("stroke", stroke);
        body.setAttribute("fill", "none");
        canvas.appendChild(body);
        return body;
    }

    insert(x, y) {}

    isInside(x, y) {
        const topBorder = this._body.getAttribute("y");
        const rightBorder =
            this._body.getAttribute("y") + this._body.getAttribute("width");
        const bottomBorder =
            this._body.getAttribute("y") + this._body.getAttribute("height");
        const leftBorder = this._body.getAttribute("y");

        const isInsideX = x >= leftBorder && x <= rightBorder;
        const isInsideY = y >= topBorder && y <= bottomBorder;

        return isInsideX && isInsideY;
    }
}
