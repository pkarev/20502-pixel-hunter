import GreetingView from "./greeting-view";
import Router from "../router";

export default class GreetingScreen {
  constructor() {
    this._view = new GreetingView();
    this._view.onNextScreenClick = Router.showRules;
    this._element = this._view.element;
  }

  get element() {
    return this._element;
  }
}
