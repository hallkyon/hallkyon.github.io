// @prettier

import Canvas from './Canvas.js';
import Controller from './Controller.js';
import EadesEmbedder from './EadesEmbedder.js';

async function main() {
    try {
        const canvas = Canvas.getInstance();
        const graph = await Controller.getNotes();
        canvas.setEmbedder(graph, EadesEmbedder.embedder);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

main();
