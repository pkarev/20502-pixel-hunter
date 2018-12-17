import AbstractPresenter from "../utils/abstract-presenter";
import RulesView from "../views/rules-view";
import Application from "../application";
import GoHomeView from "../views/go-home-view";

export default class RulesScreen extends AbstractPresenter {
  constructor({rulesView = new RulesView()} = {}) {
    super(rulesView);

    this.view.onNextScreenClick = Application.showGame;

    this._goHomeView = new GoHomeView();
    this.element.querySelector(`.header`).appendChild(this._goHomeView.element);
  }
}
