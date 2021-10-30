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
    //check to see if the game is finished, or the cell to columnIndex to is invalid.
    if (
      this.finished ||
      columnIndex < 0 ||
      columnIndex > 49 ||
      this.board[columnIndex]
    ) {
      return false
    }
    const columnElement = document.getElementById(`column ${columnIndex}`)
    const lowestCell = this.findLowestCell(columnElement)
    console.log(lowestCell)
    const cellId = lowestCell.id
    // assign player color to the cell
    this.board[cellId] = this.currentPlayer

    // ???
    this.updateCellEvent.trigger({ move: cellId, player: this.currentPlayer })

    // is the game finished? that will be determined by if any of the following returns true - did victory happen? did draw happen?
    this.finished = this.victory() || this.draw()

    // if the game is not decided yet, move on to the next turn.
    if (!this.finished) {
      this.switchPlayer()
    }

    console.log(this.board)
  }

  // check if any of the players won by comparing it to an array of possible combos. returns true or false
  victory() {
    this.scanForVictory()
  }

  //checks if the game is tied, triggers draw event if so. returns boolean
  draw() {
    // checks if each and every cell is filled
    const draw = this.board.every((i) => i)

    if (draw) {
      this.drawEvent.trigger()
    }

    return draw
  }

  //board is an array that represents the cells in a single dimensional,linear fashion
  scanForVictory() {
    this.board.forEach((cellContent, cellIndex) => {
      if (cellContent) {
        //if the cell isn't empty...
        if (
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 1] === cellContent &&
          this.board[cellIndex + 2] === cellContent &&
          this.board[cellIndex + 3] === cellContent
        ) {
          console.log('wide victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        } else if (
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 7] === cellContent &&
          this.board[cellIndex + 14] === cellContent &&
          this.board[cellIndex + 21] === cellContent
        ) {
          console.log('long victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        } else if (
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 6] === cellContent &&
          this.board[cellIndex + 12] === cellContent &&
          this.board[cellIndex + 18] === cellContent
        ) {
          console.log('south west diagonal victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        } else if (
          this.board[cellIndex] === cellContent &&
          this.board[cellIndex + 8] === cellContent &&
          this.board[cellIndex + 16] === cellContent &&
          this.board[cellIndex + 24] === cellContent
        ) {
          console.log('north east diagonal victory!')
          this.victoryEvent.trigger(this.currentPlayer)
          return true
        }
      }
    })
  }

  //passes the currentplayer field to the next player, by checking who is currently the player
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red'
  }

  findLowestCell(column) {
    const cells = [...column.children]
    let lowestCell = cells.find(checkCell)
    console.log(lowestCell)
    return lowestCell
  }
}

function checkCell(cell) {
  return !cell.hasAttribute('color')
}

export default FourInARow
