import AbstractPresenter from "../utils/abstract-presenter";
import IntroView from "../views/intro-view";
import Application from "../application";

export default class IntroScreen extends AbstractPresenter {
  constructor({introView = new IntroView()} = {}) {
    super(introView);
    this.view.onNextScreenClick = Application.showGreeting;
  }
}
