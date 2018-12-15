import RulesView from "./rules-view";
import Router from "../router";

export default class RulesScreen {
  constructor() {
    this._view = new RulesView();
    this._view.onNextScreenClick = Router.showRules;
    this._element = this._view.element;
  }

  get element() {
    return this._element;
  }
}
