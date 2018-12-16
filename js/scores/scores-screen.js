import AbstractPresenter from "../abstract-presenter";
import ScoresView from "./scores-view";
import Application from "../application";

export default class ScoresScreen extends AbstractPresenter {
  constructor(model) {
    super(new ScoresView(model));
    this._view.onGoHomeClick = Application.showIntro;
  }
}
