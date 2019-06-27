import Reducer from './Reducer'
import {filters} from '../constants'

export default class StandardReducer extends Reducer {

    reduce(board, processFurther=true) {
        this.board = board
        this.process = processFurther
        for (let i = 0; i < 9; i++) {
            this.removeRowOptions(i, this.getRow(i, filters.solved))
            this.removeColOptions(i, this.getCol(i, filters.solved))
            this.removeBoxOptions(i, this.getBox(i, filters.solved))
        }
        this.validateBoard()
    }
}