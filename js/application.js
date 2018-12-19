import GreetingScreen from "./screens/greeting-screen";
import IntroScreen from "./screens/intro-screen";
import RulesScreen from "./screens/rules-screen";
import GameScreen from "./screens/game-screen";
import ScoresScreen from "./screens/scores-screen";
import GameModel from "./models/game-model";
import DataLoadErrorScreen from "./screens/data-load-error-screen";
import Loader from "./utils/loader";

const main = document.querySelector(`#main`);

const renderScreen = (contentElement) => {
  main.innerHTML = ``;
  main.appendChild(contentElement);
};

let gameQuestions;

export default class Application {

  static start() {
    Loader.loadData().
      then((data) => {gameQuestions = data}).
      then(() => Application.showIntro())
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
    const model = new GameModel(gameQuestions, userName);
    const game = new GameScreen(model);
    renderScreen(game.element);
    game.startGame();
  }

  static showScores(model) {
    const playerName = model.playerName;
    const answers = model._answers;
    const lives = model._state.lives;
    Loader.saveResults({answers, lives}, playerName)
      .then(() => Loader.loadResults(playerName))
      .then((data) => {
        const scores = new ScoresScreen(data);
        renderScreen(scores.element);
      });
  }

  static showError(error) {
    const errorScreen = new DataLoadErrorScreen(error);
    renderScreen(errorScreen.element);
  }
}
