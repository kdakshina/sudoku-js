import test from 'tape'
import sudoku from '../../lib/sudoku'

test('getBoxXY', (t) => {
    let [x,y] = sudoku().getBoxXY(0)
    t.deepEquals([x,y], [0,0]);

    [x,y] = sudoku().getBoxXY(1)
    t.deepEquals([x,y], [0,3]);

    [x,y] = sudoku().getBoxXY(2)
    t.deepEquals([x,y], [0,6]);

    [x,y] = sudoku().getBoxXY(3)
    t.deepEquals([x,y], [3,0]);

    [x,y] = sudoku().getBoxXY(8)
    t.deepEquals([x,y], [6,6]);

    [x,y] = sudoku().getBoxXY(10)
    t.deepEquals([x,y], [6,6]);

    t.end()
})