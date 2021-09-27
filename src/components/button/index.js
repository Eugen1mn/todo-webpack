const createBtn = (title, handler) => {
  const btn = document.createElement('button');
  btn.classList.add('group-btn');
  btn.textContent = title;
  btn.addEventListener('click', handler);

  return btn;
};

export default createBtn;
