import test from 'tape'
import Reducer from '../../bin/reducers/Reducer'
const baseReducer = new Reducer()

test('getBoxXY', (t) => {
    let [x,y] = baseReducer.getBoxXY(0)
    t.deepEquals([x,y], [0,0]);

    [x,y] = baseReducer.getBoxXY(0,0)
    t.deepEquals([x,y], [0,0]);

    [x,y] = baseReducer.getBoxXY(1)
    t.deepEquals([x,y], [0,3]);

    [x,y] = baseReducer.getBoxXY(1,1)
    t.deepEquals([x,y], [0,4]);

    [x,y] = baseReducer.getBoxXY(2)
    t.deepEquals([x,y], [0,6]);

    [x,y] = baseReducer.getBoxXY(3)
    t.deepEquals([x,y], [3,0]);

    [x,y] = baseReducer.getBoxXY(3,2)
    t.deepEquals([x,y], [3,2]);

    [x,y] = baseReducer.getBoxXY(7)
    t.deepEquals([x,y], [6,3]);

    [x,y] = baseReducer.getBoxXY(7,6)
    t.deepEquals([x,y], [8,3]);

    [x,y] = baseReducer.getBoxXY(8)
    t.deepEquals([x,y], [6,6]);

    [x,y] = baseReducer.getBoxXY(8,4)
    t.deepEquals([x,y], [7,7]);

    [x,y] = baseReducer.getBoxXY(8,8)
    t.deepEquals([x,y], [8,8]);

    t.end()
})