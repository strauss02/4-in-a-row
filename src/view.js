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
      column.addEventListener('click', () => {
        this.playEvent.trigger(i) //clicking a column will trigger playEvent with the column index as param
      })
      board.append(column)
      document.body.appendChild(board)
    }

    console.log(document.getElementById(`column 1`))

    this.cells = Array(49)
      .fill()
      .map((_, i) => {
        const cell = document.createElement('div')
        cell.className = 'cell'
        cell.id = `${i}`
        cell.setAttribute('column', `${i % 7}`)
        cell.setAttribute('row', `${Math.floor(i / 7)}`)
        console.log(cell)

        //clicking on a cell will trigger the playEvent, that will go
        //through the controller to trigger the 'play()' method in the
        //model, with param `i`, index of the cell
        // cell.addEventListener('click', () => {
        //   this.playEvent.trigger(i)
        // })

        document.getElementById(`column ${i % 7}`).prepend(cell)

        return cell
      })

    this.message = document.createElement('div')
    this.message.className = 'message'

    // document.body.appendChild(board)
    document.body.appendChild(this.message)

    this.divideToColumns()
  }

  updateCell(data) {
    const cell = this.cells[data.move]
    cell.classList.add(`${data.player}-cell`)
    cell.setAttribute('color', `${data.player}`)
    // const stuntCell = cell.cloneNode(false)
    // stuntCell.removeAttribute('id')
    // stuntCell.classList.add('stunt-cell')
    // stuntCell.style.position = 'absolute'
    // cell.parentElement.appendChild(stuntCell)
  }

  victory(winner) {
    console.log(`reached view`)
    const board = document.querySelector('.board')
    this.renderUnclickable(board)
    this.message.innerHTML = `the winner is ${winner}!`
  }

  draw() {
    this.message.innerHTML = `it's a draw!`
    this.renderUnclickable(board)
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
