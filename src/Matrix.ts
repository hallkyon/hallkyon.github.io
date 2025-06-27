export default class Matrix {
    private readonly _rows: number;
    private readonly _columns: number;
    private readonly _matrix: number[][];

    constructor(rows: number, columns: number) {
        this._rows = rows;
        this._columns = columns;
        this._matrix = new Array();
        for (let i = 0; i < rows; i++) {
            this._matrix.push(new Array());
            for (let j = 0; j < columns; j++) {
                this._matrix[i].push(0)
            }
        }
    }

    getValue(row: number, column: number): number {
        if (row < 0 || row >= this._rows || column < 0 || column >= this._columns) {
            throw new Error(
                `Matrix getValue failed: Invalid indices: ${row}, ${column}`
            );
        }
        return this._matrix[row][column];
    }

    setValue(row: number, column: number, value: number): void {
        if (row < 0 || row >= this._rows || column < 0 || column >= this._columns) {
            throw new Error(
                `Matrix setValue failed: Invalid indices: ${row}, ${column}`
            );
        }
        if (!isFinite(value)) {
            throw new Error(`Matrix setValue failed: Invalid value: ${value}`);
        }
        this._matrix[row][column] = value;
    }

    public get rows(): number {
        return this._rows;
    }

    public get columns(): number {
        return this._columns;
    }

    public toString(): string {
        return this._matrix
            .map((row) => row.join(', '))
            .join('\n');
    }
}
