import renderScreen from "./render-screen";
import introScreenElement from "./screen-intro";
import {resetGame} from "./game";

const activateGoHomeButton = (template) => {
  const goHomeButton = template.querySelector(`.back`);
  const onGoHomeClick = () => {
    resetGame();
    renderScreen(introScreenElement);
  };

  goHomeButton.addEventListener(`click`, onGoHomeClick);
};

export default activateGoHomeButton;
