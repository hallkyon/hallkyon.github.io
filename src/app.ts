import Canvas from './Canvas';
import Mapper from './Mapper';

function main() {
    const graph = Mapper.getGraph();
    const canvas = Canvas.getInstance();
    canvas.draw(graph);
}

main();
