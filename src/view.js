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
    for (let i = 0; i < 7; i++) {
      const column = document.createElement('div')
      column.id = `column ${i}`
      column.className = 'column'
      board.append(column)
      document.body.appendChild(board)
    }

    console.log(document.getElementById(`column 1`))

    this.cells = Array(49)
      .fill()
      .map((_, i) => {
        const cell = document.createElement('div')
        cell.className = 'cell'
        cell.classList.add(`column-${i % 7}`)

        cell.addEventListener('click', () => {
          this.playEvent.trigger(i)
        })

        document.getElementById(`column ${i % 7}`).append(cell)

        return cell
      })

    this.message = document.createElement('div')
    this.message.className = 'message'

    // document.body.appendChild(board)
    document.body.appendChild(this.message)

    this.divideToColumns()
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

  divideToColumns() {
    const elements = document.querySelectorAll('.column-0')
    const column = document.createElement('div')
    column.className = 'column-container'
    column.append(elements)
    console.log('divided')
  }
}

export default View
