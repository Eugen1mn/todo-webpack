function reducer(action, state) {
  switch (action.type) {
    case 'ADD': {
      const task = { ...action.payload };

      const todoStore = state.todoStore.slice();
      todoStore.push(task);
      return { ...state, todoStore };
    }

    case 'DELETE': {
      const todoStore = state.todoStore.slice();
      const index = todoStore.findIndex((item) => item._id === action.payload);
      todoStore.splice(index, 1);
      return { ...state, todoStore };
    }

    case 'ISDONE': {
      const todoStore = state.todoStore.slice();
      const index = todoStore.findIndex(
        (item) => item._id === action.payload._id,
      );
      const updateTask = todoStore.splice(index, 1)[0];
      updateTask.isDone = !updateTask.isDone;
      todoStore.splice(index, 0, updateTask);
      return { ...state, todoStore };
    }

    case 'UPDATE': {
      const todoStore = state.todoStore.slice();
      const index = todoStore.findIndex(
        (item) => item._id === action.payload._id,
      );
      const updateTask = todoStore.splice(index, 1)[0];
      updateTask.text = action.payload.text;
      todoStore.splice(index, 0, updateTask);
      return { ...state, todoStore };
    }

    case 'CLEAR_COMPLITED': {
      const todoStore = state.todoStore
        .slice()
        .filter((item) => item.isDone === false);
      return { ...state, todoStore };
    }

    case 'SET_STATE': {
      const todoStore = action.payload.slice();
      return { ...state, todoStore };
    }

    default:
      return state;
  }
}

export default reducer;
