// @prettier

import Canvas from './Canvas.js';
<<<<<<< HEAD
import Mapper from './Mapper.js';

function main() {
    const graph = Mapper.getGraph();
    Canvas.draw(graph);
=======
import Controller from './Controller.js';
import UserInterface from './UserInterface.js';
import EadesEmbedder from './EadesEmbedder.js';

async function main() {
    try {
        const canvas = Canvas.getInstance();
        const graph = await Controller.getNotes();
        const saveButton = UserInterface.getSaveButton();
        saveButton.addEventListener('click', async () => {
            const note = UserInterface.getNote();
            Controller.putNote(note).then(() => {
                console.log('Note saved successfully');
            });
        });
        canvas.setEmbedder(graph, EadesEmbedder.embedder);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
>>>>>>> 1290e8e (Work in progress)
}

main();
