import AbstractPresenter from "../abstract-presenter";
import RulesView from "./rules-view";
import Application from "../application";

const rulesView = new RulesView();

export default class IntroScreen extends AbstractPresenter {
  constructor() {
    super(rulesView);
    this._view.onNextScreenClick = Application.showGame;
  }
}
