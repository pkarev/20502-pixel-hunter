import GreetingScreen from "./greeting/greeting-screen";
import IntroScreen from "./intro/intro-screen";
import RulesScreen from "./rules/rules-screen";
import GameScreen from "./game/game-screen";
import ScoresScreen from "./scores/scores-screen";
import GameModel from "./game/game-model";

const main = document.querySelector('#main');
const renderScreen = (contentElement) => {
  main.innerHTML = ``;
  main.appendChild(contentElement);
};

export default class Application {

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
}
