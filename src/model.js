import Event from './event.js'

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
    this.finished = this.victory() || this.draw()

    // if the game is not decided yet, move on to the next turn.
    if (!this.finished) {
      this.switchPlayer()
    }
  }

  // check if any of the players won by comparing it to an array of possible combos. returns true or false
  victory() {
    // this array contains all winning combos
    const lineCombos = [[1, 2, 3, 4]]

    // a constant that checks wether the board has any combos. returns true or false.
    const victory = lineCombos.some((combo) => {
      this.board[combo[0]] &&
        this.board[combo[0]] === this.board[combo[1]] &&
        this.board[combo[1]] === this.board[combo[2]]
    })

    if (victory) {
      this.victoryEvent.trigger(this.currentPlayer)
    }

    return victory
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

  //passes the currentplayer field to the next player, by checking who is currently the player
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red'
  }
}

export default FourInARow
