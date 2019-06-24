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
            stat.count.startCount = stat.count.istartCount = stat.count.iexitCount = this.getOpenCellsCount()
            this.log()
            board.map((row, ri) => {
                row.map((elem, ci) => {
                    if (elem === 0) {
                        board[ri][ci] = '123456789'
                    }
                })
            })
            stat.count.startOptions = stat.count.istartOptions =  this.getOpenOptionsCount()

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
