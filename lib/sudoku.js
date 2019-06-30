import { filters, strings, colors } from './constants'
import StandardReducer from './reducers/StandardReducer'
import UniqueOptionsReducer from './reducers/UniqueOptionsReducer'
import PointingOptionsReducer from './reducers/PointingOptionsReducer'
import NakedOptionsReducer from './reducers/NakedOptionsReducer'
import HiddenOptionsReducer from './reducers/HiddenOptionsReducer'
const standardReducer = new StandardReducer()
const uniqueOptionsReducer = new UniqueOptionsReducer()
const pointingOptionsReducer = new PointingOptionsReducer()
const nakedOptionsReducer = new NakedOptionsReducer()
const hiddenOptionsReducer = new HiddenOptionsReducer()

import log4js from 'log4js'
const logger = log4js.getLogger('sudoku.js')
logger.level = 'debug'

let stat = { start: { count: 0, options: 0 }, current: { count: 0, options: 0 }, running: { count: 0, options: 0 } }
let board

export default () => {
    return {
        initialize(_board) {
            board = _board
            this.log()
            board.map((row, ri) => {
                row.map((elem, ci) => {
                    if (elem === 0) {
                        board[ri][ci] = '123456789'
                    }
                })
            })
            stat.start.count = stat.current.count = stat.running.count = this.getOpenCellsCount()
            stat.start.options = stat.current.options = stat.running.options =  this.getOpenOptionsCount()
            stat.noprogress = stat.iteration = 0
        },

        finalize() {
            this.log()
        },

        finalizeIteration() {
            stat.running.count = this.getOpenCellsCount()
            stat.running.options = this.getOpenOptionsCount()
            if (stat.current.options  == stat.running.options) {
                stat.noprogress++
            } else {
                stat.noprogress = 0
            }
            stat.iteration++
            this.log()
            stat.current.count = stat.running.count 
            stat.current.options = stat.running.options
        },

        getOpenCellsCount() {
            let count = 0
            board.map((array) => {
                count += array.filter(filters.unsolved).length
            })
            return count
        },

        getOpenOptionsCount() {
            let count = 0
            board.map((array) => {
                array.filter(filters.unsolved).map(elem => { count += elem.length })
            })
            return count
        },

        print() {
            let result = '\n\n'
            board.map((row, ri) => {
                if (ri % 3 === 0 && Math.floor(ri / 3) > 0) result += strings.boardHLine + '\n'
                result += row.map((elem, ci) => {
                    if (typeof elem === 'number') {
                        if (elem > 0)
                            elem = colors.boardClosed + '  ' + elem + '\x1b[0m'
                        else
                            elem = '  x '
                    } else {
                        elem = '' + elem
                    }
                    if (ci % 3 === 2 && ci !== 8) return elem + '\t' + strings.boardVLine
                    return elem 
                }).join('\t')
                result += '\n'
            })
           
            logger.info(result)
        },

        log() {
            logger.info(JSON.stringify(stat))
            this.print()
        },

        resolve(_board) {
            // main code
            this.initialize(_board);
            while (stat.running.count != 0 && stat.noprogress < 2) {
                standardReducer.reduce(board)
                nakedOptionsReducer.reduce(board)
                pointingOptionsReducer.reduce(board)
                hiddenOptionsReducer.reduce(board)
                uniqueOptionsReducer.reduce(board)
                this.finalizeIteration()
            }
            this.finalize()
        }

    }
}
