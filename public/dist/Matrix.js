export default class Matrix {
    constructor(rows, columns) {
        this._rows = rows;
        this._columns = columns;
        this._matrix = new Array();
        for (let i = 0; i < rows; i++) {
            this._matrix.push(new Array());
            for (let j = 0; j < columns; j++) {
                this._matrix[i].push(0);
            }
        }
    }
    getValue(row, column) {
        if (row < 0 || row >= this._rows || column < 0 || column >= this._columns) {
            throw new Error(`Matrix getValue failed: Invalid indices: ${row}, ${column}`);
        }
        return this._matrix[row][column];
    }
    setValue(row, column, value) {
        if (row < 0 || row >= this._rows || column < 0 || column >= this._columns) {
            throw new Error(`Matrix setValue failed: Invalid indices: ${row}, ${column}`);
        }
        if (!isFinite(value)) {
            throw new Error(`Matrix setValue failed: Invalid value: ${value}`);
        }
        this._matrix[row][column] = value;
    }
    get rows() {
        return this._rows;
    }
    get columns() {
        return this._columns;
    }
    toString() {
        return this._matrix
            .map((row) => row.join(', '))
            .join('\n');
    }
}
//# sourceMappingURL=Matrix.js.map