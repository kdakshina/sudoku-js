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

    filterXWings(fishes) {
        for (let o = 1; o < 10; o++) {
            let candidates = []
            Object.keys(fishes).filter(fish => fish.startsWith(o)).map(item => {
                fishes[item].map(i => {
                    candidates.push(item.substring(1))
                })
            })
            let subsets = this.getSubsets(candidates)
            subsets.map(subset => {
                let matchingSubsets = this.getMatchingSubsets(candidates, subset)
                if (matchingSubsets.length === 3) {
                    //console.log('sward fish')
                }
            })
        }
    }


    reduceRow() {
        let fishes = {}
        this.board.map((row, rindex) => {
            this.findFishCandiates(row, rindex, fishes)
        })

        this.filterXWings(fishes)
        //console.log('row fishes ' + fishes)
    }

    reduceCol() {
        let fishes = {}
        for (let i = 0; i < 9; i++) {
            this.findFishCandiates(this.getCol(i), i, fishes)
        }
        this.filterXWings(fishes)
        //console.log('col fishes ' + fishes)
    }

    reduce(board) {
        this.board = board
        this.reduceRow()
        this.reduceCol()
        this.validateBoard()
    }
}