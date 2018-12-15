import GreetingScreen from "./greeting/greeting-screen";
import IntroScreen from "./intro/intro-screen";
import RulesScreen from "./rules/rules-screen";

const main = document.querySelector('#main');

const renderScreen = (contentElement) => {
  main.innerHTML = ``;
  main.appendChild(contentElement);
};

export default class Router {

  static showIntro() {
    const intro = new IntroScreen();
    renderScreen(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    renderScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    renderScreen(rules.element);
  }
}
