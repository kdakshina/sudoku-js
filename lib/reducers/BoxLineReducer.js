import Reducer from './Reducer'
import {filters} from '../constants'

export default class BoxLineReducer extends Reducer {

    reduceRows(index) {
        let [bx, by] = this.getBoxXY(index)
        for (let deltax = 0; deltax < 2; deltax++) {
            let brow = this.getBoxRow(bx + deltax, by, filters.unsolved)
            let restrow = this.getBoxReminingRow(bx + deltax, by, filters.unsolved)
            let options = this.getUniqueValues(brow, restrow)
            if (options.length != 0) {
                options = options.join('|')
                this.removeBoxOptions(index, options, (cell, x, y) => (x !== bx + deltax))
            }

            let restbox = this.getBoxReminingBox(index, (cell, x, y) => ( typeof cell === 'string' && x !== bx + deltax))
            options = this.getUniqueValues(brow, restbox)
            if (options.length != 0) {
                options = options.join('|')
                console.log('box row *** ' + options + '@' + [bx + deltax, by])
                this.removeRowOptions(index, options, (cell, x, y) => (x <(bx + deltax) && x > (bx + deltax + 2)))
            }
        }
    }

    reduceColumns(index) {
        let [bx, by] = this.getBoxXY(index)
        for (let deltay = 0; deltay < 2; deltay++) {
            let bcol = this.getBoxCol(bx, by + deltay, filters.unsolved)
            let restcol = this.getBoxReminingCol(bx, by + deltay, filters.unsolved)
            let options = this.getUniqueValues(bcol, restcol).join('|')
            if (options.length == 0) return
            this.removeBoxOptions(index,options,(cell,x,y) => (y !== by + deltay))

            let restbox = this.getBoxReminingBox(index, (cell, x, y) => ( typeof cell === 'string' && y !== by + deltay))
            options = this.getUniqueValues(bcol, restbox)
            if (options.length != 0) {
                options = options.join('|')
                console.log('box col *** ' + options + '@' + [bx, by + deltay])
                this.removeColOptions(index, options, (cell, x, y) => (y <(by + deltay) && y > (by + deltay + 2)))
            }
        }
    }

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            this.reduceRows(i)
            this.reduceColumns(i)
        }
        this.validateBoard()
    }
}