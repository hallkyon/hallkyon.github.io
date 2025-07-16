export default class Matrix {
    constructor(numRows, numColumns) {
        if (numRows < 1 || numColumns < 1) {
            throw new Error(`Cannot create ${numRows}x${numColumns} matrix`);
        }
        this._data = Array.from({ length: numRows }, () => new Array(numColumns).fill(0));
    }
    getValue(row, column) {
        if (false === Number.isInteger(row) || false === Number.isInteger(column)) {
            throw new Error(`Row or column must be an integer`);
        }
        if (row < 0 ||
            column < 0 ||
            row > this.numRows ||
            column > this.numColumns) {
            throw new Error(`Cannot access value at (${row},${column})`);
        }
        return this._data[row][column];
    }
    setValue(row, column, value) {
        if (false === Number.isInteger(row) || false === Number.isInteger(column)) {
            throw new Error(`Row or column must be an integer`);
        }
        if (row < 0 ||
            column < 0 ||
            row > this.numRows ||
            column > this.numColumns) {
            throw new Error(`Cannot set value at (${row},${column})`);
        }
        this._data[row][column] = value;
    }
    get numRows() {
        return this._data.length;
    }
    get numColumns() {
        return this._data[0].length;
    }
    toString() {
        return this._data.map((row) => row.join(' ')).join('\n');
    }
}
//# sourceMappingURL=Matrix.js.map