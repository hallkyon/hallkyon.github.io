// @prettier
import Canvas from './Canvas.js';
import Mapper from './Mapper.js';
function main() {
    Mapper.getNotes().then((graph) => {
        Canvas.draw(graph);
    });
}
main();
//# sourceMappingURL=app.js.map