import textValidation from './text-validation';

/** ****** TODO ITEM MODEL ******* */
export default class ListItemModel {
  constructor(text) {
    textValidation(text);

    this.text = text;
    this.isDone = false;
    this.id = Date.now() + Math.floor(Math.random() * 10000);
  }
}
