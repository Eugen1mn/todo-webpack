/* styles */
// import './style.scss';

const createTodoItem = (item) => {
  /* todolist item */
  const todoItemEl = document.createElement('li');
  todoItemEl.setAttribute('id', item._id);
  todoItemEl.classList.add('list-item');

  /* create delete button */
  const itemDeleteBtn = document.createElement('button');
  itemDeleteBtn.textContent = 'x';
  itemDeleteBtn.classList.add('item-delete-button');

  /* text  */
  const itemText = document.createElement('p');
  itemText.textContent = item.text;
  itemText.classList.add('text');
  if (item.isDone) {
    itemText.classList.add('isDone');
  } else {
    itemText.classList.remove('isDone');
  }

  /** append button and text elements from todolist item */
  todoItemEl.append(itemText, itemDeleteBtn);

  return todoItemEl;
};

export default createTodoItem;
