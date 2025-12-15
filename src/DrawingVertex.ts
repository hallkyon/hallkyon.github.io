import type DrawingInterface from './interfaces/DrawingInterface';
import Point from './Point';
import Canvas from './Canvas';

export default class DrawingVertex implements DrawingInterface {
    private readonly _position: Point;
    private readonly _maxLabelLength: number = 200;
    private readonly _fill = ' #BA3925 ';
    private readonly _textColor = 'white';
    private _label!: string;

    private readonly _svgRect!: SVGRectElement;
    private readonly _svgText!: SVGTextElement;
    private readonly _svgGroup!: SVGGElement;
    private readonly _anchor!: SVGAElement;

    constructor(x: number, y: number, id: string, label: string) {
        const namespace = 'http://www.w3.org/2000/svg';
        this._position = new Point(x, y);

        this._svgText = document.createElementNS(namespace, 'text');
        this._svgText.setAttribute('x', String(this._position.x));
        this._svgText.setAttribute('y', String(this._position.y));
        this._svgText.setAttribute('dy', '1em');
        this._svgText.setAttribute('fill', this._textColor);

        this._svgRect = document.createElementNS(namespace, 'rect');
        this._svgRect.setAttribute('x', String(this._position.x));
        this._svgRect.setAttribute('y', String(this._position.y));
        this._svgRect.setAttribute('fill', this._fill);

        this._svgGroup = document.createElementNS(namespace, 'g');
        this._svgGroup.appendChild(this._svgRect);
        this._svgGroup.appendChild(this._svgText);

        this._anchor = document.createElementNS(namespace, 'a');
        this._anchor.setAttribute('href', `http://localhost:5173/${id}.html`);
        this._anchor.appendChild(this._svgGroup);

        const canvas = Canvas.getInstance();
        canvas.addDrawing(this._anchor);

        this.label = label;
    }

    public get svg(): SVGElement {
        return this._svgGroup;
    }

    public get x(): number {
        return this._position.x;
    }

    public set x(newX: number) {
        this._position.x = newX;
        this._svgRect.setAttribute('x', String(newX));
        this._svgText.setAttribute('x', String(newX));
        const tspans = this._svgText.querySelectorAll('tspan');
        tspans.forEach((tspan) => {
            tspan.setAttribute('x', String(newX));
        });
    }

    public get y(): number {
        return this._position.y;
    }

    public set y(newY: number) {
        this._position.y = newY;
        this._svgRect.setAttribute('y', String(newY));
        this._svgText.setAttribute('y', String(newY));
    }

    public get label(): string {
        return this._label;
    }

    public set label(label: string) {
        this._label = label;

        const namespace = 'http://www.w3.org/2000/svg';
        const words = this._label.split(/\s+/);
        let line: string[] = [];

        while (this._svgText.firstChild) {
            this._svgText.remove();
        }
        let tspan = document.createElementNS(namespace, 'tspan');
        this._svgText.appendChild(tspan);

        words.forEach((word) => {
            line.push(word);
            tspan.textContent = line.join(' ');

            if (tspan.getComputedTextLength() > this._maxLabelLength) {
                line.pop();
                tspan.textContent = line.join(' ');
                line = [word];
                tspan = document.createElementNS(namespace, 'tspan');
                tspan.setAttribute('x', String(this.position.x));
                tspan.setAttribute('dy', `1.2em`);
                tspan.textContent = word;
                this._svgText.appendChild(tspan);
            }
        });

        const padding = 20;
        const textBoundingBox = this._svgText.getBBox();
        this.width = textBoundingBox.width + padding;
        this.height = textBoundingBox.height + padding;

        this._svgGroup.setAttribute(
            'transform',
            `translate(${-this.width / 2}, ${-this.height / 2})`
        );
    }

    public get top(): number {
        return this.y - this.height / 2;
    }

    public get right(): number {
        return this.x + this.width / 2;
    }

    public get bottom(): number {
        return this.y + this.height / 2;
    }

    public get left(): number {
        return this.x - this.width / 2;
    }

    public get topLeft(): Point {
        return new Point(this.left, this.top);
    }

    public get topRight(): Point {
        return new Point(this.right, this.top);
    }

    public get bottomRight(): Point {
        return new Point(this.right, this.bottom);
    }

    public get bottomLeft(): Point {
        return new Point(this.left, this.bottom);
    }

    public get width(): number {
        const width = this._svgRect.getAttribute('width');
        return width ? Number.parseFloat(width) : 0;
    }

    private set width(newWidth: number) {
        const textBoundingBox = this._svgText.getBBox();
        if (newWidth < textBoundingBox.width) {
            throw new Error(`Invalid width: ${newWidth}`);
        }

        this._svgRect.setAttribute('width', String(newWidth));

        const textTranslationX = (newWidth - textBoundingBox.width) / 2;
        const textTranslationY = (this.height - textBoundingBox.height) / 2;
        this._svgText.setAttribute(
            'transform',
            `translate(${textTranslationX}, ${textTranslationY})`
        );
    }

    public get height(): number {
        const height = this._svgRect.getAttribute('height');
        return height ? Number.parseFloat(height) : 0;
    }

    private set height(newHeight: number) {
        const textBoundingBox = this._svgText.getBBox();
        if (newHeight < textBoundingBox.height) {
            throw new Error(`Invalid height: ${newHeight}`);
        }

        this._svgRect.setAttribute('height', String(newHeight));

        const textTranslationX = (this.width - textBoundingBox.width) / 2;
        const textTranslationY = (newHeight - textBoundingBox.height) / 2;
        this._svgText.setAttribute(
            'transform',
            `translate(${textTranslationX}, ${textTranslationY})`
        );
    }

    public get position(): Point {
        return this._position;
    }

    public set position(newPosition: Point) {
        this.x = newPosition.x;
        this.y = newPosition.y;
    }

    public toString(): string {
        return `DrawingVertex(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
    }
}
