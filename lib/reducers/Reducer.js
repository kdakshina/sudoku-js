import {filters} from '../constants'

Set.prototype.difference = function (otherSet) {
    var differenceSet = new Set();
    for (var elem of this) {
        if (!otherSet.has(elem))
            differenceSet.add(elem);
    }
    return differenceSet;
} 

class Reducer {

    isString(value) {
        return (typeof value == 'string')
    }

    isNumber(value) {
        return (typeof value == 'number')
    }

    getRow(row, filter = item => (true)) {
        return this.board[row].filter(filter)
    }

    getBoxRow(row, col, filter = item => (true)) {
        return this.board[row].slice(col, col + 3).filter(filter)
    }

    getBoxReminingRow(row, col, filter = item => (true)) {
        return this.board[row].filter((item, index) => (index < col || index > col + 2)).filter(filter)
    }

    getCol(col, filter = item => (true)) {
        return this.board.map((item) => { return item[col] }).filter(filter)
    }

    getBoxCol(row, col, filter = item => (true)) {
        return this.getCol(col).slice(row, row + 3).filter(filter)
    }

    getBoxReminingCol(row, col, filter = item => true) {
        return this.getCol(col).filter((item, index) => (index < row || index > row + 2)).filter(filter)
    }

    getBox(index, filter=item => true) {
        var boxArray = [];
        let [bx, by] = this.getBoxXY(index)
        for (let i = bx; i < (bx + 3); i++) {
            for (let j = by; j < (by + 3); j++) {
                boxArray.push(this.board[i][j])
            }
        }
        return boxArray.filter(filter)
    }

    getBoxReminingBox(index, filter = item => true) {
        var boxArray = [];
        let [bx, by] = this.getBoxXY(index)
        for (let i = bx; i < (bx + 3); i++) {
            for (let j = by; j < (by + 3); j++) {
                let item = this.board[i][j]
                if (!filter(item,i,j)) continue
                boxArray.push(item)
            }
        }
        return boxArray
    }

    _getBox(row, col, filter, discludeSelf) {
        var boxArray = [];
        let [bx, by] = this.getBoxRC(row, col)
        for (let i = bx; i < (bx + 3); i++) {
            for (let j = by; j < (by + 3); j++) {
                if (!(discludeSelf && row == i && col == j)) {
                    boxArray.push(this.board[i][j])
                }
            }
        }
        return boxArray.filter(filter)
    }

    getOptionIndexMap(array) {
        let map = {}
        array.map((item, index) => {
            if (typeof item === 'string') {
                item.split('').map(option => {
                    if (typeof map[option] === 'undefined') {
                        map[option] = [index]
                    } else {
                        map[option].push(index)
                    }
                })
            }
        })
        return map
    }

    getMatchingOptions(optionIndexMap, option) {
        let indices = optionIndexMap[option]
        let result = ''
        Object.keys(optionIndexMap).map(key => {
            if (optionIndexMap[key].join('') == indices.join(''))
                result += key
        })
        return result
    }

    getBoxXY(index) {
        if (index > 8) index = 8  //valid 0 thru 8 only
        return [Math.floor(index / 3) * 3, (index % 3) * 3]
    }

    getBoxRC(row, col) {
        if (row > 8) row = 8  //valid 0 thru 8 only
        if (col > 8) col = 8  //valid 0 thru 8 only
        return [Math.floor(row / 3) * 3, Math.floor(col / 3) * 3]
    }



    getUniqueValues(items, rest) {
        let itemsSet = new Set(items.join('').split(''))
        let restSet = new Set(rest.join('').split(''))
        let diff = itemsSet.difference(restSet)
        return Array.from(diff)
    }

    isValid(array) {
        return array.length === new Set(array).size;
    }

    removeOption(x, y, option) {
        let item = this.board[x][y]
        if (this.isString(item) && item.indexOf(option) > -1) {
            item = item.replace(option, '')
            if (item.length === 1) {
                this.board[x][y] = Number(item)
                this.resolveCell(x, y, this.board[x][y])
            } else {
                this.board[x][y] = item
            }

        }
    }

    removeRowOptions(rowno, options, filter) {
        if (options.length == 0) return
        for (let i = 0; i < 9; i++) {
            this.removeOptions(rowno, i, options, filter)
        }
    }

    removeColOptions(colno, options, filter) {
        for (let i = 0; i < 9; i++) {
            this.removeOptions(i, colno, options, filter)
        }
    }

    removeBoxOptions(boxno, options, filter) {
        let [bx, by] = this.getBoxXY(boxno)
        return this._removeBoxOptions(bx,by,options,filter)
    }

    _removeBoxOptions(bx,by,options,filter) {
        for (let i = bx; i < (bx + 3); i++) {
            for (let j = by; j < (by + 3); j++) {
                this.removeOptions(i, j, options, filter)
            }
        }
    }

    removeOptions(x, y, options, filter = cell => true) {
        let item = this.board[x][y]
        if (item.length > 0 && filter(item, x, y)) {
            item = item.replace(new RegExp(options, 'g'), '')
            if (item.length === 1) {
                this.board[x][y] = Number(item)
                this.resolveCell(x, y, this.board[x][y])
            } else {
                this.board[x][y] = item
            }

        }
    }

    resolveCell(row, col, item) {
        // row, column options removals
        for (let i = 0; i < 9; i++) {
            this.removeOption(row, i, item)
            this.removeOption(i, col, item)
        }

        // box options removals
        let [bx, by] = this.getBoxRC(row, col)
        for (let i = bx; i < (bx + 3); i++) {
            for (let j = by; j < (by + 3); j++) {
                this.removeOption(i, j, item)
            }
        }
    }

    validateBoard() {
        for (let i = 0; i < 9; i++) {
            let array = this.getRow(i, filters.solved)
            if (!this.isValid(array)) {
                console.log('Invalid row ' + i)
                return false
            }
            array = this.getCol(i, filters.solved)
            if (!this.isValid(array)) {
                console.log('Invalid col ' + i)
                return false
            }
            array = this.getBox(i, filters.solved, false)
            if (!this.isValid(array)) {
                console.log('Invalid box (' + bx + ',' + by + ')')
                return false
            }
        }
        return true
    }
}
export default Reducer