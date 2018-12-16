import AbstractPresenter from "../abstract-presenter";
import IntroView from "./intro-view";
import Application from "../application";
const introView = new IntroView();

export default class IntroScreen extends AbstractPresenter {
  constructor() {
    super(introView);
    this._view.onNextScreenClick = Application.showGreeting;
  }
}
