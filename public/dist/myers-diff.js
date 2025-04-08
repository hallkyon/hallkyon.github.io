"use strict";
// @prettier
// Helper function: Given two arrays, compute the diff using Myers' algorithm.
function myersDiff(a, b) {
    const N = a.length;
    const M = b.length;
    const max = N + M;
    // V will store the furthest x reached at diagonal k.
    // We use an offset because k can be negative.
    const offset = max;
    const V = new Array(2 * max + 1).fill(0);
    // trace will record the state of V at each edit distance
    const trace = [];
    // Phase 1: Forward search to find the shortest edit path
    for (let d = 0; d <= max; d++) {
        // Save a copy of V for backtracking later.
        trace.push(V.slice());
        for (let k = -d; k <= d; k += 2) {
            const kIndex = k + offset;
            // Determine whether to go down (insertion) or right (deletion)
            let x;
            if (k === -d || (k !== d && V[kIndex - 1] < V[kIndex + 1])) {
                // Move down: an insertion was made in A (or deletion in B)
                x = V[kIndex + 1];
            }
            else {
                // Move right: a deletion was made in A
                x = V[kIndex - 1] + 1;
            }
            let y = x - k;
            // "Slide" along the diagonal (match phase)
            while (x < N && y < M && a[x] === b[y]) {
                x++;
                y++;
            }
            V[kIndex] = x;
            // If we have reached the end of both sequences, start backtracking
            if (x >= N && y >= M) {
                return backtrack(trace, a, b, offset);
            }
        }
    }
    // In theory, we should never reach here.
    return [];
}
// Phase 2: Backtracking through the trace to build the edit script.
function backtrack(trace, a, b, offset) {
    let x = a.length;
    let y = b.length;
    const edits = [];
    // Traverse the trace backwards
    for (let d = trace.length - 1; d >= 0; d--) {
        const V = trace[d];
        // Determine the diagonal k corresponding to current (x, y)
        const k = x - y;
        const kIndex = k + offset;
        // Determine the previous k value
        let prevK;
        if (k === -d || (k !== d && V[kIndex - 1] < V[kIndex + 1])) {
            prevK = k + 1;
        }
        else {
            prevK = k - 1;
        }
        const prevKIndex = prevK + offset;
        // Determine previous x and y coordinates from the trace
        const prevX = V[prevKIndex];
        const prevY = prevX - prevK;
        // Trace back any diagonal (match) moves
        while (x > prevX && y > prevY) {
            // Since these were matching elements, record a match.
            edits.push({ type: 'match', value: a[x - 1] });
            x--;
            y--;
        }
        // Record the edit that led from the previous state to the current state
        if (d > 0) {
            if (x === prevX) {
                // Insertion: An element from b was added.
                edits.push({ type: 'insert', value: b[prevY] });
            }
            else {
                // Deletion: An element from a was removed.
                edits.push({ type: 'delete', value: a[prevX] });
            }
        }
        // Set current position to the previous coordinates
        x = prevX;
        y = prevY;
    }
    // The operations were collected in reverse order, so reverse them
    return edits.reverse();
}
// Example usage:
const str1 = 'The quick brown fox jumps over the lazy dog.';
const str2 = 'The swift brown fox leaps over a lazy dog.';
const diff = myersDiff(str1.split(' '), str2.split(' '));
console.log(diff);
// const oldLines = ['line one', 'line two', 'line three', 'line four'];
// const newLines = ['line one', 'line 2', 'line three', 'line four', 'line five'];
// const diff = myersDiff(oldLines, newLines);
// console.log(diff);
