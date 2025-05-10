// @prettier

import Canvas from './Canvas.js';
<<<<<<< HEAD
import Mapper from './Mapper.js';

function main() {
    const graph = Mapper.getGraph();
    Canvas.draw(graph);
=======
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
>>>>>>> 1290e8e (Work in progress)
}

main();
