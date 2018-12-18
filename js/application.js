import GreetingScreen from "./screens/greeting-screen";
import IntroScreen from "./screens/intro-screen";
import RulesScreen from "./screens/rules-screen";
import GameScreen from "./screens/game-screen";
import ScoresScreen from "./screens/scores-screen";
import GameModel from "./models/game-model";
import DataLoadErrorView from "./views/data-load-error-view";
import DataLoadErrorScreen from "./screens/data-load-error-screen";

const main = document.querySelector('#main');

const renderScreen = (contentElement) => {
  main.innerHTML = ``;
  main.appendChild(contentElement);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


export default class Application {

  static start() {
    window.fetch(` https://es.dump.academy/pixel-hunter/questionsdfgs`).
      then(checkStatus).
      then((response) => Application.showIntro())
      .catch(Application.showError);
  }

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

  static showGame(userName) {
    const model = new GameModel(userName);
    const game = new GameScreen(model);
    renderScreen(game.element);
    game.startGame();
  }

  static showScores(model) {
    const scores = new ScoresScreen(model);
    renderScreen(scores.element);
  }

  static showError(error) {
    const errorScreen = new DataLoadErrorScreen(error);
    renderScreen(errorScreen.element);
  }
}
