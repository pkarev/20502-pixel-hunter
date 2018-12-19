import DataLoadErrorView from "../views/data-load-error-view";

export default class DataLoadErrorScreen {
  constructor(error) {
    this._view = new DataLoadErrorView(error);
    this._element = this._view.element;
  }

  get element() {
    return this._element;
  }
}
