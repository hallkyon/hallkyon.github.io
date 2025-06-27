// @prettier

import Canvas from './Canvas.js';
import Mapper from './Mapper.js';

async function main() {
    const graph = await Mapper.getNotes();
    console.log('Graph loaded:', graph);
    Canvas.draw(graph);
}

main();
