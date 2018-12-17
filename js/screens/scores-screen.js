import AbstractPresenter from "../utils/abstract-presenter";
import ScoresView from "../views/scores-view";
import Application from "../application";

export default class ScoresScreen extends AbstractPresenter {
  constructor(model) {
    super(new ScoresView(model));
    this._view.onGoHomeClick = Application.showIntro;
  }
}
