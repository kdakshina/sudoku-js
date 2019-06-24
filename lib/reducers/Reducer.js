const closedCells = cell => (typeof cell === 'number' && cell !== 0)
const openCells = cell => (typeof cell === 'string' || cell === 0)

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

    getCol(col, filter = item => (true)) {
        return this.board.map((item) => { return item[col] }).filter(filter)
    }

    getBox(row, col, filter, discludeSelf) {
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

    getBoxXY(index) {
        if (index > 8) index = 8  //valid 0 thru 8 only
        return [Math.floor(index / 3) * 3, (index % 3) * 3]
    }

    getBoxRC(row, col) {
        if (row > 8) row = 8  //valid 0 thru 8 only
        if (col > 8) col = 8  //valid 0 thru 8 only
        return [Math.floor(row / 3) * 3, Math.floor(col / 3) * 3]
    }

    getSetDifference(setA, setB) {
        var diff = setA
        for (var elem of setB) {
            diff.delete(elem);
        }
        return diff
    }

    isValid(array) {
        return array.length === new Set(array).size;
    }

    validateBoard() {
        for (let i = 0; i < 9; i++) {
            let array = this.getRow(i, closedCells)
            if (!this.isValid(array)) {
                console.log('Invalid row ' + i)
                return false
            }
            array = this.getCol(i, closedCells)
            if (!this.isValid(array)) {
                console.log('Invalid col ' + i)
                return false
            }
            let [bx, by] = this.getBoxXY(i)
            array = this.getBox(bx, by, closedCells, false)
            if (!this.isValid(array)) {
                console.log('Invalid box (' + bx + ',' + by + ')')
                return false
            }
        }
        return true
    }
}
export default Reducer