export default class Matrix {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 8f01410 (Rectangular vertices now have random widths)
=======
>>>>>>> 36cbbf5 (Making different vertex shapes possible)
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 08ad5bc (Added Matrix class)
=======
=======
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
>>>>>>> 7b553b8 (Rectangular vertices now have random widths)
>>>>>>> 8f01410 (Rectangular vertices now have random widths)
=======
    }
    toString() {
        return this._data.map((row) => row.join(' ')).join('\n');
>>>>>>> 36cbbf5 (Making different vertex shapes possible)
    }
}
//# sourceMappingURL=Matrix.js.map