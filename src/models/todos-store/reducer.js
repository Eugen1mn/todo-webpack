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

    case 'DELETE': {
      const todoStore = state.todoStore.slice();
      const index = todoStore.findIndex((item) => item.id === action.payload);
      todoStore.splice(index, 1);
      return { ...state, todoStore };
    }

    case 'ISDONE': {
      const todoStore = state.todoStore.slice();
      const index = todoStore.findIndex((item) => item.id === action.payload);
      const updateStatus = todoStore.splice(index, 1)[0];
      updateStatus.status = !updateStatus.status;
      todoStore.splice(index, 0, updateStatus);
      return { ...state, todoStore };
    }

    case 'UPDATE': {
      const todoStore = state.todoStore.slice();
      const index = todoStore.findIndex(
        (item) => item.id === action.payload.id,
      );
      const updateTask = todoStore.splice(index, 1)[0];
      updateTask.text = action.payload.text;
      todoStore.splice(index, 0, updateTask);
      return { ...state, todoStore };
    }

    case 'CLEAR_COMPLITED': {
      const todoStore = state.todoStore
        .slice()
        .filter((item) => item.status === false);
      return { ...state, todoStore };
    }

    default:
      return state;
  }
}

export default reducer;
