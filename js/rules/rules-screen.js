import AbstractPresenter from "../abstract-presenter";
import RulesView from "./rules-view";
import Router from "../router";

const rulesView = new RulesView();

export default class IntroScreen extends AbstractPresenter {
  constructor() {
    super(rulesView);
    this._view.onNextScreenClick = Router.showGame;
  }
}
