# sudoku-js
A sudoku solver program written in javascript.  This program take sudoku problem inputs in 2D json array format aka 'board' and iteratively solves the board. Currently there are only a few basic reducers are implemented and more to be implemented in future.

## Data Structures
Name | Type | Description
------------ | ------------- | -------------
| board | a Json 2D array | <ul><li>numeric value indicates a solved cell</li><li>string values indicates a unsolved cells with available options.</li></ul>
| stat  | a Json object | holds various execution statistics and counts for debuging and logging purposes.

## Reducers
Reducer reduces options from unresolved cells and paves way solving the board.  Based on the complexity, more advanced reducers are needed to solve a board.

### 1. standard options reducer
it reduces options form unsolved cells for a solved value in a row, columm or box

### 2. naked options reducer
any repeating options in a row, col or box (2 pairs, 3 tripples) removes those options from rest of the respectie row, col and boxes.

### 3. pointing options reducer
if a row or column of a box contains unique key(s) within the box or entire row or column, those options can be removed from rest of the box or rows or columns.

### 4. hidden options reducer
any hidden options in a row, col or box removes those options from rest of the respective row, col and boxes.

### 5. unique options reducer
it reduces unique option(s) (one single, two doubles, three tripples etc) from rest of the row, column or box

## Execution
There are few puzzles stored as json files under 'e' (easy) or 'm' (medium) or 'h' (ard) directories of puzzle dir. 
Should you need to add a new puzzle add a new n.json file under any of 'e' or 'm' or 'h' dirs with puzzle data.

puzzle id = dir/filename  eg.  e/2, m/1, h/2

```
$ npm run build
$ npm run start  <puzzle id>
```