import Reducer from './Reducer'
import { filters, check, reducers } from '../constants'


export default class SwordFishReducer extends Reducer {

    findFishCandiates(array, arrayIndex, fishes) {
        let imap = this.getOptionIndexMap(array)
        Object.keys(imap).map(item => {
            if (imap[item].length < 2 || imap[item].length > 3) {
                delete imap[item]
            } else {
                let itemvalue = item + imap[item].join('')
                if (check.isundefined(fishes[itemvalue]))
                    fishes[itemvalue] = [arrayIndex]
                else
                    fishes[itemvalue].push(arrayIndex)
            }
        })
    }

    getSubsets(options) {
        return options.filter(filters.distinct).reduce(reducers.subsets, [[]]).filter(item => item.length === 3)
    }

    getMatchingSubsets(candidates, subset) {
        return candidates.filter(candidate => {
            let match = subset.match(this.getRegExp(candidate, 'g'))
            return (match != null && match.length === candidate.length)
        })
    }

    filterFishes(fishes) {
        let filtered = {}
        for (let option = 1; option < 10; option++) {
            let candidates = []
            Object.keys(fishes).filter(fish => fish.startsWith(option)).map(item => {
                fishes[item].map(i => {
                    candidates.push(item.substring(1))
                })
            })
            let subsets = this.getSubsets(candidates)
            subsets.map(subset => {
                let matchingSubsets = this.getMatchingSubsets(candidates, subset)
                if (matchingSubsets.length === 3) {
                    var othervalue = ''
                    matchingSubsets.map(msubset => {
                        othervalue += fishes[option + msubset].join('')
                    })
                    if (typeof filtered[option] === 'undefined') filtered[option] = []
                    filtered[option] = [subset, othervalue]
                }
            })
        }
        return filtered
    }


    reduceRow() {
        let fishes = {}
        this.board.map((row, rindex) => {
            this.findFishCandiates(row, rindex, fishes)
        })

        fishes = this.filterFishes(fishes)
        Object.keys(fishes).map(fish => {
            var col = fishes[fish][0].split('')
            var row = fishes[fish][1]
            var filter = (item, x, y) => (row.indexOf(x) === -1)
            for (let colno in col) {
                this.removeColOptions(col[colno], fish, filter)
            }
        })
    }

    reduceCol() {
        let fishes = {}
        for (let i = 0; i < 9; i++) {
            this.findFishCandiates(this.getCol(i), i, fishes)
        }
        fishes = this.filterFishes(fishes)
        Object.keys(fishes).map(fish => {
            var row = fishes[fish][0].split('')
            var col = fishes[fish][1]
            var filter = (item, x, y) => (col.indexOf(y) === -1)
            for (let rowno in row) {
                this.removeRowOptions(row[rowno], fish, filter)
            }
        })
    }

    reduce(board) {
        this.board = board
        this.reduceRow()
        this.reduceCol()
        this.validateBoard()
    }
}