export default class AbstractPresenter {
  constructor(view) {
    this._view = view;
    this._element = this._view.element;
  }

  get element() {
    return this._element;
  }

  get view() {
    return this._view;
  }
}
