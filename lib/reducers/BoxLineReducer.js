import Reducer from './Reducer'
import {filters} from '../constants'

export default class BoxLineReducer extends Reducer {

    reduceRows(bx, by) {
        for (let deltax = 0; deltax < 2; deltax++) {
            let brow = this.getBoxRow(bx + deltax, by, filters.openCells)
            let restrow = this.getBoxReminingRow(bx + deltax, by, filters.openCells)
            let difference = this.getUniqueValues(brow, restrow)

            for (var it = difference.values(), val = null; val = it.next().value;) {
                //console.log('box row value => ' + JSON.stringify(val) + ' @' + (bx + deltax) + ',' + by)
                for (let bi = bx; bi < bx + 3; bi++) {
                    if (bi === bx + deltax) continue
                    for (let bj = by; bj < by + 3; bj++) {
                        this.removeOption(bi,bj,val)
                    }
                }
            }
        }
    }

    reduceColumns(bx, by) {
        for (let deltay = 0; deltay < 2; deltay++) {
            let bcol = this.getBoxCol(bx, by + deltay, filters.openCells)
            let restcol = this.getBoxReminingCol(bx, by+deltay, filters.openCells) 
            let difference = this.getUniqueValues(bcol, restcol)

            for (var it = difference.values(), val = null; val = it.next().value;) {
                //console.log('box col value => ' + JSON.stringify(val) + ' @' + bx + ',' + (by + deltay))
                for (let bj = by; bj < by + 3; bj++) {
                    if (bj === by + deltay) continue
                    for (let bi = bx; bi < bx + 3; bi++) {
                        this.removeOption(bi,bj,val)
                    }
                }
            }
        }
    }

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            let [bx, by] = this.getBoxXY(i)
            this.reduceRows(bx, by)
            this.reduceColumns(bx, by)
        }
        this.validateBoard()
    }
}