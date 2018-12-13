import renderScreen from "./render-screen";

import IntroView from "./views/intro-view";
import GreetingView from "./views/greeting-view";
import RulesView from "./views/rules-view";
import Game from "./game";
import GameView from "./views/game-view";
import StatsView from "./views/stats-view";

const game = new Game();
const introView = new IntroView();
const greetingView = new GreetingView();
const rulesView = new RulesView();
const gameView = new GameView(game);

renderScreen(introView.element);

introView.onNextScreenClick = () => {
  renderScreen(greetingView.element);
};

greetingView.onNextScreenClick = () => {
  renderScreen(rulesView.element);
};

rulesView.onGoHomeClick = () => {
  renderScreen(introView.element);
};

rulesView.onNextScreenClick = () => {
  renderScreen(gameView.element);
};

gameView.onAnswer = (correctness, time) => {
  game.onAnswer(correctness, time);
};

game.onGameStateUpdate = () => {
  const updatedView = new GameView(game);
  renderScreen(updatedView.element);

  updatedView.onAnswer = (correctness, time) => {
    game.onAnswer(correctness, time);
  };
};

game.onGameOver = () => {
  const statsView = new StatsView(game);
  renderScreen(statsView.element);

  statsView.onGoHomeClick = () => {
    game.reset();
    renderScreen(introView.element);
  };
};


