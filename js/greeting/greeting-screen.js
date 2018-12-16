import AbstractPresenter from "../abstract-presenter";
import GreetingView from "./greeting-view";
import Application from "../application";

export default class IntroScreen extends AbstractPresenter {
  constructor({greetingView = new GreetingView()} = {}) {
    super(greetingView);
    this.view.onNextScreenClick = Application.showRules;
  }
}
