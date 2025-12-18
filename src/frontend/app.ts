import Canvas from './Canvas';
import Mapper from './Mapper';

async function main() {
    const graph = await Mapper.getGraph();
    const canvas = Canvas.getInstance();
    canvas.draw(graph);
}

await main();
