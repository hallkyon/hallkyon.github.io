# Code Duplication

## The Approach

1. Filter comments and white spaces out, to compact each line and to uniform the input.
    1. For language specific cases like the break; in C this filter can be extended to also accommodate these patterns

2. Make a basic string comparison between each line (O(n^2)) and return true if identical and false if they differ
    1. To reduce the amount of time for the comparison, each line can be
        hashed into B bucket and each lines in a bucket is compared with one another
        reducing the time by the size of B. Considerations need to be made because
        the size of one bucket determines the maximum number of a duplicate
        sequence. It shouldn't be set too small

3. The resulting Matrix can then be visualized.
4. Diagonals (with a maximum length of holes) are then textually reported as text

## Reference

1: A Language Independent Approach for Detecting Duplicated Code
