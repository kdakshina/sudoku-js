import Reducer from './Reducer'

export default class UniqueOptionsReducer extends Reducer {
    reduceRow(rowno) {
        var optionIndexMap = this.getOptionIndexMap(this.getRow(rowno))
        Object.keys(optionIndexMap).forEach(option => {
            let indices = optionIndexMap[option]
            let options = this.getMatchingOptions(optionIndexMap, option)
            let actual = options.length
            if (indices.length === actual) {
                if (actual === 1) {
                    //console.log('unique row = @' + rowno + ' token= ' + options)
                    this.board[rowno][indices[0]] = Number(option)
                    this.resolveCell(rowno, indices[0], option)
                } else {
                    //console.log('unique row = @' + rowno + ' token= ' + options)
                    let filter = (item, x, y) => !indices.includes(y)
                    this.removeRowOptions(rowno, options, filter)
                }
            }
        })
    }

    reduceCol(colno) {
        var optionIndexMap = this.getOptionIndexMap(this.getCol(colno))
        Object.keys(optionIndexMap).forEach(option => {
            let indexes = optionIndexMap[option]
            let options = this.getMatchingOptions(optionIndexMap, option)
            let actual = options.length
            if (indexes.length === options.length) {
                if (actual === 1) {
                    //console.log('unique col = @' + colno + ' token= ' + options)
                    this.board[indexes[0]][colno] = Number(option)
                    this.resolveCell( indexes[0], colno, option)
                } else {
                    //console.log('unique col = @' + colno + ' token= ' + options)
                    let filter = (item, x, y) => !indexes.includes(x)
                    this.removeColOptions(colno, options, filter)
                }
            }
        })
    }

    reduceBox(boxno) {
        var optionIndexMap = this.getOptionIndexMap(this.getBox(boxno))
        Object.keys(optionIndexMap).forEach(option => {
            let indexes = optionIndexMap[option]
            let options = this.getMatchingOptions(optionIndexMap, option)
            let actual = options.length
            if (indexes.length === options.length) {
               
                if (actual === 1) {
                    //console.log('unique box = @' + boxno + ' token= ' + options)
                    let [x,y] = this.getBoxXY(boxno, indexes[0])
                    this.board[x][y] = Number(option)
                    this.resolveCell( x, y, this.board[x][y])
                } else {
                    //console.log('unique box = @' + boxno + ' token= ' + options)
                    let xys = indexes.map(delta => (this.getBoxXY(boxno,delta).join('')))
                    let filter = (item, x, y) => !xys.includes(''+x+y)
                    this.removeBoxOptions(boxno, options, filter)
                }
            }
        })
    }

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            this.reduceRow(i)
            this.reduceCol(i)
            this.reduceBox(i)
        }
        this.validateBoard()
    }
}