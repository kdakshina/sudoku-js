# sudoku-js
A sudoku solver program written in javascript.  This program take sudoku problem inputs in 2D json array format aka 'board' and iteratively solves the board. Currently there are only two reductions are implemented and more reductions to be implemented.

## Data Structures
Name | Type | Description
------------ | ------------- | -------------
| board | a Json 2D array | <ul><li>numeric value indicates a solved cell</li><li>string values indicates a unsolved cells with available options.</li></ul>
| stats | a Json object | holds various execution statistics and counts for debuging and logging purposes.

## Reducers
Reducer reduces options from unresolved cells and paves way solving the board.  Based on the complexity, more advanced reducers are needed to solve a board.

### 1. standard options reducer (implemented)
it reduces options form unsolved cells for a solved value in a row, columm or box

### 2. single options reducer (implemented)
it resolves a single option containing cell in a row, column or box

## Execution
This progam is in it's early stage. 
```
* modify 'board' variable @src/index.mjs to feed a puzzle
* $ npm run start
```

## Note
```
* feeding inputs will be improved soon.
```