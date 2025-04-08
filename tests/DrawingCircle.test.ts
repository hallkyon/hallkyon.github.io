// @prettier

import { describe, expect, it, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import DrawingCircle from '../src/DrawingCircle.ts';

let drawing;

describe('DrawingCircle', () => {
    beforeEach(() => {
        const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
        document.body.innerHTML = html;
        drawing = new DrawingCircle(1, 2);
    });

    it('should create a DrawingCircle', () => {
        const circle = document.querySelector('circle');
        expect(circle).not.toBeNull();
    });

    it('should hide the drawing on the canvas', () => {
        drawing.hide();
        const circle = document.querySelector('circle');
        expect(circle).toBeNull();
    });

    it('should set and give back the x and y coordinates', () => {
        drawing.x = 3;
        expect(drawing.x).toStrictEqual(3);
        drawing.y = 4;
        expect(drawing.y).toStrictEqual(4);
    });

    it('should set and give back the position', () => {
        drawing.position = { x: 5, y: 6 };
        expect(drawing.position.x).toStrictEqual(5);
        expect(drawing.position.y).toStrictEqual(6);
    });

    it('should set and give back the radius', () => {
        drawing.radius = 5;
        expect(drawing.radius).toStrictEqual(5);
    });

    it('should set and give back the fill color', () => {
        drawing.fill = 'red';
        expect(drawing.fill).toStrictEqual('red');
    });

    it('should set and give back the stroke color', () => {
        drawing.stroke = 'blue';
        expect(drawing.stroke).toStrictEqual('blue');
    });
});
