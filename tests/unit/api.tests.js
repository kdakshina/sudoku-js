import test from 'tape'
import Reducer from '../../bin/reducers/Reducer'
const baseReducer = new Reducer()

test('getBoxXY', (t) => {
    let [x,y] = baseReducer.getBoxXY(0)
    t.deepEquals([x,y], [0,0]);

    [x,y] = baseReducer.getBoxXY(1)
    t.deepEquals([x,y], [0,3]);

    [x,y] = baseReducer.getBoxXY(2)
    t.deepEquals([x,y], [0,6]);

    [x,y] = baseReducer.getBoxXY(3)
    t.deepEquals([x,y], [3,0]);

    [x,y] = baseReducer.getBoxXY(8)
    t.deepEquals([x,y], [6,6]);

    [x,y] = baseReducer.getBoxXY(10)
    t.deepEquals([x,y], [6,6]);

    t.end()
})