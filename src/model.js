import Event from './event'

class FourInARow {
  constructor() {
    this.board = Array(42).fill()
    this.currentPlayer = 'red'
    this.finished = false

    this.updateCellEvent = new Event()
    this.victoryEvent = new Event()
    this.drawEvent = new Event()
  }
  play(move) {
    //check to see if the game is finished, or the cell to move to is invalid.
    if (this.finished || move < 0 || move > 42 || this.board[move]) {
      return false
    }
    // assign player color to the cell
    this.board[move] = this.currentPlayer

    // ???
    this.updateCellEvent.trigger({ move, player: this.currentPlayer })

    //???
    this.finished = this.victoryEvent() || this.draw()

    if (!this.finished) {
      this.switchPlayer()
    }
  }
}
