export default class Matrix {
    private readonly _data: number[][];

    constructor(numRows: number, numColumns: number) {
        if (numRows < 1 || numColumns < 1) {
            throw new Error(`Cannot create ${numRows}x${numColumns} matrix`);
        }
        this._data = Array.from({ length: numRows }, () =>
            new Array(numColumns).fill(0)
        );
    }

    public getValue(row: number, column: number): number {
        if (false === Number.isInteger(row) || false === Number.isInteger(column)) {
            throw new Error(`Row or column must be an integer`);
        }
        if (
            row < 0 ||
            column < 0 ||
            row > this.numRows ||
            column > this.numColumns
        ) {
            throw new Error(`Cannot access value at (${row},${column})`);
        }
        return this._data[row][column];
    }

    public setValue(row: number, column: number, value: number): void {
        if (false === Number.isInteger(row) || false === Number.isInteger(column)) {
            throw new Error(`Row or column must be an integer`);
        }
        if (
            row < 0 ||
            column < 0 ||
            row > this.numRows ||
            column > this.numColumns
        ) {
            throw new Error(`Cannot set value at (${row},${column})`);
        }
        this._data[row][column] = value;
    }

    public get numRows(): number {
        return this._data.length;
    }

    public get numColumns(): number {
        return this._data[0].length;
    }

    public toString(): string {
        return this._data.map((row) => row.join(' ')).join('\n');
    }
}
