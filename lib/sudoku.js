import {filters, strings, colors} from './constants'
import StandardReducer from './reducers/StandardReducer'
import UniqueOptionsReducer from './reducers/UniqueOptionsReducer'
import BoxLineReducer from './reducers/BoxLineReducer'
import NakedPairReducer from './reducers/NakedPairReducer'
const standardReducer = new StandardReducer()
const uniqueOptionsReducer = new UniqueOptionsReducer()
const boxlineReducer = new BoxLineReducer()
const nakedpairReducer = new NakedPairReducer()

let stat
let board

export default () => {
    return {
        initialize(_board) {
            board =_board
            stat = { iteration: -1, count: { none: 0 } }
            this.log()
            board.map((row, ri) => {
                row.map((elem, ci) => {
                    if (elem === 0) {
                        board[ri][ci] = '123456789'
                    }
                })
            })
            stat.count.startCount = stat.count.istartCount = stat.count.iexitCount = this.getOpenCellsCount()
            stat.count.startOptions = stat.count.istartOptions = this.getOpenOptionsCount()

        },

        finalize() {
            stat.count.exitCount = stat.count.iexitCount
            this.log()
        },

        finalizeIteration() {
            stat.count.iexitCount = this.getOpenCellsCount()
            stat.count.iexitOptions = this.getOpenOptionsCount()
            if (stat.count.istartOptions == stat.count.iexitOptions) {
                stat.count.none++
            } else {
                stat.count.none = 0
            }
            stat.iteration++
            this.log()
            stat.count.istartCount = stat.count.iexitCount
            stat.count.istartOptions = stat.count.iexitOptions
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
            console.log('\n')
            board.map((row, ri) => {
                if (ri % 3 === 0 && Math.floor(ri / 3) > 0) console.log(strings.boardHLine)
                console.log(row.map((elem, ci) => {
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
                }).join('\t'))
            })
        },

        log() {
            console.log(' stat => ' + JSON.stringify(stat))
            this.print()
            console.log('\n')
        },

        resolve(_board) {
            // main code
            this.initialize(_board);
            
            while (stat.count.iexitCount != 0 && stat.count.none < 2) {
                standardReducer.reduce(board)
                uniqueOptionsReducer.reduce(board)
                boxlineReducer.reduce(board)
                nakedpairReducer.reduce(board)
                this.finalizeIteration()
            }

            this.finalize()
        }

    }
}
