import StandardReducer from './reducers/StandardReducer'
import SingleOptionReducer from './reducers/SingleOptionReducer'
import BoxLineReducer from './reducers/BoxLineReducer'
const standardReducer = new StandardReducer()
const singleOptionReducer = new SingleOptionReducer()
const boxlineReducer = new BoxLineReducer()

let stat
let board
// filters
const closedCells = cell => (typeof cell === 'number' && cell !== 0)
const openCells = cell => (typeof cell === 'string' || cell === 0)

export default () => {
    return {
        initialize(_board) {
            board = _board
            stat = { iteration: -1, count: { none: 0 } }
            stat.count.entry = stat.count.ientry = stat.count.iexit = this.getOpenCellsCount()
            this.log()
            board.map((row, ri) => {
                row.map((elem, ci) => {
                    if (elem === 0) {
                        board[ri][ci] = '123456789'
                    }
                })
            })
            stat.count.options = this.getOpenOptionsCount()

        },

        finalize() {
            stat.count.exit = stat.count.iexit
            this.log()
        },

        finalizeIteration() {
            stat.count.iexit = this.getOpenCellsCount()
            stat.count.options = this.getOpenOptionsCount()
            if (stat.count.ientry == stat.count.iexit) {
                stat.count.none++
            } else {
                stat.count.none = 0
            }
            stat.iteration++
            this.log()
            stat.count.ientry = stat.count.iexit
        },

        getOpenCellsCount() {
            let count = 0
            board.map((array) => {
                count += array.filter(openCells).length
            })
            return count
        },

        getOpenOptionsCount() {
            let count = 0
            board.map((array) => {
                array.filter(openCells).map(elem => { count += elem.length })
            })
            return count
        },

        log() {
            console.log(' stat => ' + JSON.stringify(stat))
            console.log(board)
            console.log('\n')
        },

        resolve(_board) {
            // main code
            this.initialize(_board);

            while (stat.count.iexit !== 0 && stat.count.none < 1) {
                standardReducer.reduce(board)
                singleOptionReducer.reduce(board)
                boxlineReducer.reduce(board)
                // TODO: more reducers to come
                this.finalizeIteration()
            }

            this.finalize()
        }

    }
}
