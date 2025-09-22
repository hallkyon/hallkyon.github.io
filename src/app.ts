import Canvas from './Canvas';
import Mapper from './Mapper';

function main() {
    const graph = Mapper.getGraph();
    Canvas.draw(graph);
}

main();
