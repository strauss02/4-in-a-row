import FourInARow from './model.js'
import View from './view.js'

class Controller {
  constructor() {
    this.model = new FourInARow()
    this.view = new View()

    this.view.playEvent.addListener((move) => {
      this.model.play(move)
    })

    this.model.updateCellEvent.addListener((data) => {
      this.view.updateCell(data)
    })

    this.model.victoryEvent.addListener((winner) => {
      this.view.victory(winner)
    })

    this.model.drawEvent.addListener(() => {
      this.view.draw()
    })
    //bind data from dom (view) to actions from model
  }

  run() {
    this.view.render()
  }
}

export default Controller
