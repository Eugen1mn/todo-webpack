class State {
  constructor() {
    this.state = {};
  }

  setState(action) {
    if (action.type === 'ADD') {
      if (!this.state.todoStore) {
        this.state.todoStore = [];
      }
      this.state.todoStore.push(action.payload);
    }

    if (action.type === 'DELETE') {
      const deleteIndex = this.todoStore.findIndex(
        (item) => item.id === action.payload,
      );
      this.store.splice(deleteIndex, 1);
    }
  }

  getState(action) {
    let returnValue = null;
    if (action.type === 'todos') {
      returnValue = this.state.todoStore;
    }
    return returnValue;
  }
}

export default State;
