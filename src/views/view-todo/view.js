/* event emitter */
import EventEmitter from '../../models/event-emitter/event-emitter';

import {
  getAll,
  addTask,
  deleteTask,
  deleteAllComplited,
  updateTask,
} from '../../service';

/* state */
import Store from '../../models/todos-store/todos-store';

/* styles */
import '../../styles/main.scss';

/* components */
import createBtn from '../../components/button';
import createTodoItem from '../../components/task-item';
import createInputChange from '../../components/change-input';

// const todoItem = new ToDoList();
/* STATE */
const store = new Store();

/* VIEW */
const rootDiv = document.querySelector('#root');

/* title */
const titleToDo = document.createElement('h1');
titleToDo.textContent = 'Todolist';

/* MAIN SECTION */
const main = document.createElement('main');
main.setAttribute('id', 'main');

/* ADD INPUT */
const addInput = document.createElement('input');
addInput.setAttribute('id', 'add_input');
addInput.setAttribute('type', 'text');
addInput.setAttribute('placeholder', 'What need to be done?');

/* LIST  */
const todoListEl = document.createElement('ul');
todoListEl.setAttribute('id', 'todo_list');

/* BUTTON GROUP */
const buttonsActionWrapper = document.createElement('div');
buttonsActionWrapper.setAttribute('id', 'button_group');
buttonsActionWrapper.classList.add('button_group');

/* RENDER */
function render(todoStore) {
  todoListEl.innerHTML = '';

  todoStore.forEach((item) => {
    /* create todolist item */
    const itemEl = createTodoItem(item);

    /* append item from list */
    todoListEl.appendChild(itemEl);
  });

  if (store.getState().todoStore.length === 0) {
    buttonsActionWrapper.remove();
  } else {
    main.append(buttonsActionWrapper);
  }
}

/** ****** TOGGLE ACTIVE ******** */
function toggleActiveBtn(el) {
  el.children[0].classList.remove('active-btn');
  el.children[1].classList.remove('active-btn');
  el.children[2].classList.remove('active-btn');
  el.children[3].classList.remove('active-btn');
}

/* show all */
const showAllBtn = createBtn('All', (e) => {
  toggleActiveBtn(e.target.parentElement);
  e.target.classList.add('active-btn');
  render(store.getState().todoStore);
});

/* show active */
const showActiveBtn = createBtn('Active', (e) => {
  toggleActiveBtn(e.target.parentElement);
  e.target.classList.add('active-btn');
  const activeStore = store
    .getState()
    .todoStore.filter((item) => item.isDone === false);
  render(activeStore);
});

/* show complited */
const showComplitedBtn = createBtn('Complited', (e) => {
  toggleActiveBtn(e.target.parentElement);
  e.target.classList.add('active-btn');
  const complitedStore = store
    .getState()
    .todoStore.filter((item) => item.isDone === true);
  render(complitedStore);
});

/* clearcompleted all */
const clearComplitedBtn = createBtn('Clear complited', (e) => {
  deleteAllComplited().then(() => {
    toggleActiveBtn(e.target.parentElement);
    store.dispatch({ type: 'CLEAR_COMPLITED' });
    render(store.getState().todoStore);
  });
});

/*  append group  */
buttonsActionWrapper.append(
  showAllBtn,
  showActiveBtn,
  showComplitedBtn,
  clearComplitedBtn,
);

/* APPEND MAIN */
main.append(addInput, todoListEl);

/* APPEND ROOT */
rootDiv.append(titleToDo, main);

/** ****** HELPER DOUBLE CLICK ******** */
let waitingForClick = false;

function theClick(e, id) {
  switch (e.detail) {
    case 1: // first click
      waitingForClick = setTimeout(() => {
        const upTask = store.getTaskById(id);
        updateTask({ ...upTask, isDone: !upTask.isDone }, upTask._id).then(
          (data) => {
            store.dispatch({ type: 'ISDONE', payload: data.data });
            render(store.getState().todoStore);
          },
        );
      }, 250);
      break;

    default:
      // more click
      if (waitingForClick) {
        // remove click
        clearTimeout(waitingForClick);
        waitingForClick = false;

        const inputChangeText = createInputChange();
        let textEl = [];
        if (e.target.classList.contains('text')) {
          textEl = e.target;
        } else if (e.target.classList.contains('list-item')) {
          const transfer = e.target.children[0];
          textEl = transfer;
        }
        inputChangeText.value = textEl.textContent;
        textEl.parentElement.prepend(inputChangeText);
        textEl.textContent = '';
        inputChangeText.focus();
        inputChangeText.onblur = () => {
          textEl.textContent = inputChangeText.value;
          inputChangeText.remove();
          const upTask = store.getTaskById(id);
          updateTask({ ...upTask, text: textEl.textContent }, upTask._id).then(
            (data) => {
              store.dispatch({ type: 'UPDATE', payload: data.data });
              render(store.getState().todoStore);
            },
          );
        };
      }

      break;
  }
}

/* event emitter */
const emiter = new EventEmitter();

emiter.subscribe('event: add-task', (e) => {
  addTask({ taskName: e.target.value }).then((data) => {
    store.dispatch({ type: 'ADD', payload: data.data });
    e.target.value = '';
    render(store.getState().todoStore);
  });
});

emiter.subscribe('event: todo-event', (e) => {
  if (e.target.classList.contains('item-delete-button')) {
    const { id } = e.target.parentElement;
    deleteTask(id).then(() => {
      store.dispatch({ type: 'DELETE', payload: id });
      render(store.getState().todoStore);
    });
  }

  if (e.target.classList.contains('text')) {
    const { id } = e.target.parentElement;
    theClick(e, id);
  }

  if (e.target.classList.contains('list-item')) {
    const { id } = e.target;
    theClick(e, id);
  }
});

/* *****EVENT LISTENERS***** */

/* add task */
addInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    emiter.trigger('event: add-task', e);
  }
});

addInput.addEventListener('blur', (e) => {
  emiter.trigger('event: add-task', e);
});

/* todo event */
todoListEl.addEventListener('click', (e) => {
  emiter.trigger('event: todo-event', e);
});

getAll().then((data) => {
  store.dispatch({ type: 'SET_STATE', payload: data.data });
  render(store.getState().todoStore);
});
