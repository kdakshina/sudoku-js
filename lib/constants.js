import { util } from "prettier";

export const filters = {
    length2: cell => cell.length === 2,
    length3: cell => cell.length === 3,
    solved: cell => (typeof cell === 'number'),
    unsolved: cell => (typeof cell === 'string'),
    duplicate: (cell, index, self) => self.indexOf(cell) !== index
}

export const colors = {
    boardLine : '\x1b[36m',
    boardClosed : '\x1b[33m'
}

export const strings = {
    boardHLine : colors.boardLine + '─'.repeat(24) + '┼' + '─'.repeat(31) + '┼' + '─'.repeat(27) + '\x1b[0m',
    boardVLine : colors.boardLine + '│\x1b[0m'
}