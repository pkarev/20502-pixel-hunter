import createDomElementFromStringTemplate from "./create-dom-element";
import {validateFields} from "./util";
import renderScreen from "./render-screen";
import gameThreeImageScreenElement from "./screen-game-three-images";
import activateGoHomeButton from "./go-home";
import {INITIAL_GAME_STATE, MAX_LIVES} from "./game";
import {mockQuestions} from "./mocks/questions.mock";

const headerTemplate = (gameState) => `
<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
</button>
<div class="game__timer">${gameState.time}</div>
<div class="game__lives">
  ${new Array(MAX_LIVES - gameState.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
  ${new Array(gameState.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
</div>
`;

const questionOneImageTemplate = (question) => `
<p class="game__task">${question.task}</p>
<form class="game__content  game__content--wide">
  <div class="game__option">
    <img src="${question.images[0].src}" alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo" required>
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint" required>
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

const gameOneImageScreenTemplate = `
<header class="header">
  ${headerTemplate(INITIAL_GAME_STATE)}
</header>
<section class="game">
  ${questionOneImageTemplate(mockQuestions[0])}
  ${statsTemplate}
</section>
`;

const gameOneImageScreenElement = createDomElementFromStringTemplate(gameOneImageScreenTemplate);
const gameFormAnswers = Array.from(gameOneImageScreenElement.querySelectorAll(`input`));

gameFormAnswers.forEach((answer) => {
  answer.addEventListener(`change`, () => {
    let isFormValid = validateFields(gameFormAnswers);
    if (!isFormValid) {
      return;
    }
    renderScreen(gameThreeImageScreenElement);
  });
});

activateGoHomeButton(gameOneImageScreenElement);

export default gameOneImageScreenElement;
