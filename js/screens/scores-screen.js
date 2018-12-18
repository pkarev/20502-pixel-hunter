import AbstractPresenter from "../utils/abstract-presenter";
import ScoresView from "../views/scores-view";
import Application from "../application";
import GoHomeView from "../views/go-home-view";

export default class ScoresScreen extends AbstractPresenter {
  constructor(model) {
    super(new ScoresView(model));

    this._view.onGoHomeClick = Application.showIntro;

    this._goHomeView = new GoHomeView();
    this.element.querySelector(`.header`).appendChild(this._goHomeView.element);
  }
}
