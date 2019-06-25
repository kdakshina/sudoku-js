import { util } from "prettier";

export const filters = {
    length2: cell => cell.length === 2,
    closedCells: cell => (typeof cell === 'number'),
    openCells: cell => (typeof cell === 'string'),
    duplicate: (cell, index, self) => self.indexOf(cell) !== index
}

export const strings = {
    boardHLine : '\x1b[34m─'.repeat(24) + '┼' + '─'.repeat(31) + '┼' + '─'.repeat(27) + '\x1b[0m',
    boardVLine : '\x1b[34m│\x1b[0m'
}