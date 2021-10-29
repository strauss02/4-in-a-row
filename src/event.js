/*
What is this class about?
Well, I'm not so sure yet, but I think it's about binding several listeners to a single event more easily.
*/

class Event {
  constructor() {
    this.listeners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  //this method is called upon when we wish to trigger an action by the event, with a parameter.
  trigger(params) {
    this.listeners.forEach((listener) => listener(params))
  }
}

export default Event
