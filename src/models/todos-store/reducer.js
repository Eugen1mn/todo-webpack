import ListItemModel from '../model-todo/list-item-model';

function reducer(action, state) {
  switch (action.type) {
    case 'ADD': {
      const task = new ListItemModel(action.payload);
      if (!state.todoStore) {
        const todoStore = [];
        todoStore.push(task);
        return { todoStore };
      }
      const todoStore = state.todoStore.slice();
      todoStore.push(task);
      return { ...state, todoStore };
    }

    default:
      return state;
  }
}

export default reducer;
