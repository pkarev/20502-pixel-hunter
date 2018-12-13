import renderScreen from "./render-screen";

import IntroView from "./intro-view";
import GreetingView from "./greeting-view";
import RulesView from "./rules-view";
import GameView from "./game-view";

const introView = new IntroView();
const greetingView = new GreetingView();
const rulesView = new RulesView();
const gameView = new GameView();

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
  console.log(`go next`);
};
