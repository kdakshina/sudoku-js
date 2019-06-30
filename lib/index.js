import sudoku from './sudoku'
import fs from 'fs'
import log4js from 'log4js'

const logger = log4js.getLogger('index.js')
logger.level = 'debug'

function getFileName(id) {
    return 'puzzles/' + id + '.json'
}

function getPuzzle(filename) {
    let rawdata = fs.readFileSync(filename);
    return JSON.parse(rawdata);
}

let ids = (process.argv.length > 2)
    ? process.argv.filter((val, index) => (index > 1))
    : ['m/2']

ids.map(val => {
    var file = getFileName(val)
    logger.info('solving ... ' + file)
    sudoku().resolve(getPuzzle(file).board)
})