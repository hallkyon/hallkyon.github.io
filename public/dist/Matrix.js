export default class Matrix {
<<<<<<< HEAD
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
=======
    constructor(numRows, numColumns) {
        if (numRows < 1 || numColumns < 1) {
            throw new Error(`Cannot create ${numRows}x${numColumns} matrix`);
        }
        this._data = new Array(numRows).fill(new Array(numColumns).fill(0));
    }
    getValue(row, column) {
        if (row < 0 ||
            column < 0 ||
            row > this.numRows ||
            column > this.numColumns) {
            throw new Error(`Cannot access value at (${row},${column})`);
        }
        return this._data[row][column];
    }
    setValue(row, column, value) {
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
>>>>>>> 08ad5bc (Added Matrix class)
    }
}
//# sourceMappingURL=Matrix.js.map