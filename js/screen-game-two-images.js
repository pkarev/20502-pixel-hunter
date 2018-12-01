import createDomElementFromStringTemplate from "./create-dom-element";
import renderScreen from "./render-screen";
import gameOneImageScreenElement from "./screen-game-one-image";
import {validateFields} from "./util";
import activateGoHomeButton from "./go-home";

const headerTemplate = `
<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
</button>
<div class="game__timer">NN</div>
<div class="game__lives">
  <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
  <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
  <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
</div>
`;

const questionTwoImagesTemplate = `
<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
<form class="game__content">
  <div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo" required>
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint" required>
      <span>Рисунок</span>
    </label>
  </div>
  <div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question2" type="radio" value="photo" required>
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question2" type="radio" value="paint" required>
      <span>Рисунок</span>
    </label>
  </div>
</form>
`;

const statsTemplate = `
<ul class="stats">
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--correct"></li>
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--unknown"></li>
</ul>
`;

const gameTwoImagesScreenTemplate = `
<header class="header">
  ${headerTemplate}
</header>
<section class="game">
  ${questionTwoImagesTemplate}
  ${statsTemplate}
</section>
`;

const gameTwoImageScreenElement = createDomElementFromStringTemplate(gameTwoImagesScreenTemplate);
const gameFormAnswers = Array.from(gameTwoImageScreenElement.querySelectorAll(`input`));

gameFormAnswers.forEach((answer) => {
  answer.addEventListener(`change`, () => {
    let isFormValid = validateFields(gameFormAnswers);
    if (!isFormValid) {
      return;
    }
    renderScreen(gameOneImageScreenElement);
  });
});

activateGoHomeButton(gameTwoImageScreenElement);

export default gameTwoImageScreenElement;
