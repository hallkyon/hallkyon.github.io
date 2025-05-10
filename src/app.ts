// @prettier

import Canvas from './Canvas.js';
import Controller from './Controller.js';
import EadesEmbedder from './EadesEmbedder.js';

async function main() {
    try {
        const canvas = Canvas.getInstance();
        const controller = Controller.getInstance();
        const graph = await controller.getNotes();
        canvas.setEmbedder(graph, EadesEmbedder.embedder);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

main();
