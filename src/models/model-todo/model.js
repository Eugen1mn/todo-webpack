import idValidation from './id-validation';
import ListItemModel from './list-item-model';

/** ****** TODOLIST ******* */
export default class ToDoList {
  constructor() {
    this.store = [];
  }

  /** ****** CREATE ******* */
  create(text) {
    const task = new ListItemModel(text);
    this.store.push(task);
    return task;
  }

  /** ****** DELETE ******* */
  deleteTask(id) {
    idValidation(id);
    const index = this.findIdx(id);
    const deleteEl = this.store.splice(index, 1);

    return deleteEl;
  }

  /** ****** ISDONE ******* */
  isDone(id) {
    idValidation(id);
    const index = this.findIdx(id);
    const updateStatus = this.store.splice(index, 1)[0];

    updateStatus.status = !updateStatus.status;

    this.store.splice(index, 0, updateStatus);

    return updateStatus.status;
  }

  /** ****** UPDATE ******* */
  updateTask(id, text) {
    idValidation(id);
    const index = this.findIdx(id);
    const modifyTask = this.store.splice(index, 1)[0];
    modifyTask.text = text;
    this.store.splice(index, 0, modifyTask);

    return modifyTask;
  }

  /** ****** GET ALL ******* */
  getAll() {
    return this.store;
  }

  /** ****** GET ACTIVE ******* */
  getActive() {
    return this.store.filter((item) => item.status === false);
  }

  /** ****** GET COMPLITED ******* */
  getComplited() {
    return this.store.filter((item) => item.status === true);
  }

  /** ****** CLEAR COMPLITED ******* */
  clearComplited() {
    this.store = this.store.filter((item) => item.status === false);
    return this.store;
  }

  /** ****** FIND INDEX ******* */
  findIdx(id) {
    return this.store.findIndex((item) => item.id === id);
  }
}
