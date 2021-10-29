import FourInARow from './model'
import View from './view'

class Controller {
  constructor() {
    this.model = new FourInARow()
    this.view = new View()

    //bind data from dom (view) to actions from model
  }

  run() {
    this.view.render()
  }
}

export default Controller
