import reducer from './reducer';

class Store {
  constructor() {
    this.state = {};
  }

  dispatch(action) {
    const newState = reducer(action, this.state);
    this.state = newState;
  }

  getState() {
    return this.state;
  }
}

export default Store;
