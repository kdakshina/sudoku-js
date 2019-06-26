
export const maps = {
    masksolved: (cell) => { return (typeof cell === 'number')? '' : cell },
    maskunsolved: (cell) => { return (typeof cell === 'string')? '' : cell },
}

export const filters = {
    length2: cell => cell.length === 2,
    defined: item=>typeof item !== 'undefined',
    undefined: item=>typeof item === 'undefined',
    solved: cell => typeof cell === 'number',
    unsolved: cell => typeof cell === 'string',
    duplicate: (cell, index, self) => self.indexOf(cell) !== index,
    distinct: (cell, index, self) => self.indexOf(cell) === index
}

export const colors = {
    boardLine: '\x1b[36m',
    boardClosed: '\x1b[33m'
}

export const strings = {
    boardHLine: colors.boardLine + '─'.repeat(24) + '┼' + '─'.repeat(31) + '┼' + '─'.repeat(27) + '\x1b[0m',
    boardVLine: colors.boardLine + '│\x1b[0m'
}