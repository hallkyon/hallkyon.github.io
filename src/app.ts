// @prettier

import Canvas from './Canvas.js';
import Mapper from './Mapper.js';

function main() {
    const graph = Mapper.getGraph();
    Canvas.draw(graph);
}

main();
