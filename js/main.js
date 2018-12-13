import renderScreen from "./render-screen";

import IntroView from "./intro-view";
import GreetingView from "./greeting-view";
import RulesView from "./rules-view";
import Game from "./game";
import GameView from "./game-view";

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
  console.log(`here must be render stats screen`);
};

