import AbstractPresenter from "../abstract-presenter";
import IntroView from "./intro-view";
import Application from "../application";

export default class IntroScreen extends AbstractPresenter {
  constructor({introView = new IntroView()} = {}) {
    super(introView);
    this.view.onNextScreenClick = Application.showGreeting;
  }
}
