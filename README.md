# sudoku-js
A sudoku solver program written in javascript.  This program take sudoku problem inputs in 2D json array format aka 'board' and iteratively solves the board. Currently there are only a few basic reducers are implemented and more to be implemented in future.

## Data Structures
Name | Type | Description
------------ | ------------- | -------------
| board | a Json 2D array | <ul><li>numeric value indicates a solved cell</li><li>string values indicates a unsolved cells with available options.</li></ul>
| stats | a Json object | holds various execution statistics and counts for debuging and logging purposes.

## Reducers
Reducer reduces options from unresolved cells and paves way solving the board.  Based on the complexity, more advanced reducers are needed to solve a board.

### 1. standard options reducer
it reduces options form unsolved cells for a solved value in a row, columm or box

### 2. single options reducer
it resolves a single option containing cell in a row, column or box

### 3. box line option reducer
if a box row or column contains unique key(s) within the entire row of column, those options can be removed from rest of the box elements.

### 4. naked pair options reducer
any pair of two options in a row, col or box removes those options from respective row, col and boxes.

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