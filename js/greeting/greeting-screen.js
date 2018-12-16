import AbstractPresenter from "../abstract-presenter";
import GreetingView from "./greeting-view";
import Application from "../application";

const greetingView = new GreetingView();

export default class IntroScreen extends AbstractPresenter {
  constructor() {
    super(greetingView);
    this._view.onNextScreenClick = Application.showRules;
  }
}
