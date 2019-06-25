import Reducer from './Reducer'
import {filters} from '../constants'

export default class StandardReducer extends Reducer {

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            let rowOptions =  this.getRow(i, filters.solved).join('|') 
            this.removeRowOptions(i, rowOptions)

            let colOptions =  this.getCol(i, filters.solved).join('|') 
            this.removeColOptions(i, colOptions)

            let boxOptions =  this.getBox(i, filters.solved).join('|') 
            this.removeBoxOptions(i, boxOptions)
        }
        this.validateBoard()
    }
}