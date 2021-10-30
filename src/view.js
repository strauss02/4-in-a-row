// import './assets/view.css'
import Event from './event.js'

class View {
  constructor() {
    this.playEvent = new Event()
  }

  render() {
    const board = document.createElement('div')
    board.className = 'board'
    //create a board element

    this.cells = Array(49)
      .fill()
      .map((_, i) => {
        const cell = document.createElement('div')
        cell.className = 'cell'

        cell.addEventListener('click', () => {
          this.playEvent.trigger(i)
        })

        board.appendChild(cell)

        return cell
      })

    this.message = document.createElement('div')
    this.message.className = 'message'

    document.body.appendChild(board)
    document.body.appendChild(this.message)
  }

  updateCell(data) {
    this.cells[data.move].classList.add(`${data.player}-cell`)
  }

  victory(winner) {
    console.log(`reached view`)
    const board = document.querySelector('.board')
    this.renderUnclickable(board)
    this.message.innerHTML = `the winner is ${winner}!`
  }

  draw() {
    this.message.innerHTML = `it's a draw!`
  }

  renderUnclickable(element) {
    element.style.pointerEvents = 'none'
  }
}

export default View
