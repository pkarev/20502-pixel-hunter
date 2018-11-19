import renderScreen from "./render-screen";
import introScreenElement from "./screen-intro";

const activateGoHomeButton = (template) => {
  const goHomeButton = template.querySelector(`.back`);
  const onGoHomeClick = () => {
    renderScreen(introScreenElement);
  };

  goHomeButton.addEventListener(`click`, onGoHomeClick);
};

export default activateGoHomeButton;
