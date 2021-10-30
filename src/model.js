import Event from './event.js'

class FourInARow {
  constructor() {
    this.board = Array(49).fill()
    this.currentPlayer = 'red'
    this.finished = false

    this.updateCellEvent = new Event()
    this.victoryEvent = new Event()
    this.drawEvent = new Event()
  }
  play(columnIndex) {
    if (this.finished) {
      return false
    }

    const columnElement = document.getElementById(`column ${columnIndex}`)
    const lowestCell = this.findLowestCell(columnElement)
    const cellId = lowestCell.id

    // assign player color to the cell
    this.board[cellId] = this.currentPlayer

    this.updateCellEvent.trigger({ move: cellId, player: this.currentPlayer })

    // check if the game is won or ended with a draw to finish it
    this.finished = this.victory() || this.draw()

    // if the game is not decided yet, move on to the next turn.
    if (!this.finished) {
      this.switchPlayer()
    }
  }

  victory() {
    this.scanForVictory()
  }

  draw() {
    // checks if each and every cell is filled
    const draw = this.board.every((i) => i)

    if (draw) {
      this.drawEvent.trigger()
    }

    return draw
  }

  scanForVictory() {
    this.board.forEach((cellContent, cellIndex) => {
      const cellElement = this.getCellElement(`${cellIndex}`)

      if (cellContent) {
        //if the cell isn't empty...
        if (
          cellElement.getAttribute('column') < 4 && //prevent sequence by differnet rows
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 1] === cellContent &&
          this.board[cellIndex + 2] === cellContent &&
          this.board[cellIndex + 3] === cellContent
        ) {
          // console.log('wide victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        } else if (
          cellElement.getAttribute('row') < 4 &&
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 7] === cellContent &&
          this.board[cellIndex + 14] === cellContent &&
          this.board[cellIndex + 21] === cellContent
        ) {
          // console.log('long victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        } else if (
          this.getCellElement(cellIndex).getAttribute('column') > 2 &&
          this.getCellElement(cellIndex).getAttribute('row') < 4 &&
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 6] === cellContent &&
          this.board[cellIndex + 12] === cellContent &&
          this.board[cellIndex + 18] === cellContent
        ) {
          // console.log('south east diagonal victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        } else if (
          this.getCellElement(cellIndex).getAttribute('column') < 3 &&
          this.getCellElement(cellIndex).getAttribute('row') < 3 &&
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 8] === cellContent &&
          this.board[cellIndex + 16] === cellContent &&
          this.board[cellIndex + 24] === cellContent
        ) {
          // console.log('north east diagonal victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        }
      }
    })
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red'
  }

  findLowestCell(column) {
    const cells = [...column.children].reverse()
    let lowestCell = cells.find(this.checkCell)
    return lowestCell
  }

  checkCell(cell) {
    return !cell.hasAttribute('color')
  }

  getCellElement(cellIndex) {
    return document.getElementById(`${cellIndex}`)
  }
}

export default FourInARow
