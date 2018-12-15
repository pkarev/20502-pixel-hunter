import IntroView from "./intro-view";
import Router from "../router";

export default class IntroScreen {
  constructor() {
    this._view = new IntroView();
    this._view.onNextScreenClick = Router.showGreeting;
    this._element = this._view.element;
  }

  get element() {
    return this._element;
  }
}
