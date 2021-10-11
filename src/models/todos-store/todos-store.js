import reducer from './reducer';

class Store {
  constructor() {
    this.state = {};
  }

  dispatch(action) {
    const newState = reducer(action, this.state);
    this.state = newState;
  }

  getTaskById(id) {
    const todoStore = this.state.todoStore.slice();
    const index = todoStore.findIndex((item) => item._id === id);

    return { ...todoStore[index] };
  }

  getState() {
    return this.state;
  }
}

export default Store;
