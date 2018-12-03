import createDomElementFromStringTemplate from "./create-dom-element";
import renderScreen from "./render-screen";
import statsScreenElement from "./screen-stats";
import activateGoHomeButton from "./go-home";
import {INITIAL_GAME_STATE, MAX_LIVES} from "./game";
import {mockQuestions} from "./questions.mock";

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

const questionTwoImagesTemplate = (question) => `
<p class="game__task">${question.task}</p>
<form class="game__content  game__content--triple">
  ${question.images.map((image) => `
    <div class="game__option">
      <img src="${image.src}" alt="Option 1" width="304" height="455">
    </div>
  `).join(``)}
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

const gameThreeImagesScreenTemplate = `
<header class="header">
  ${headerTemplate(INITIAL_GAME_STATE)}
</header>
<section class="game">
  ${questionTwoImagesTemplate(mockQuestions[2])}
  ${statsTemplate}
</section>
`;

const ANSWER_CLASS_NAME = `game__option`;

const gameThreeImageScreenElement = createDomElementFromStringTemplate(gameThreeImagesScreenTemplate);
const gameForm = gameThreeImageScreenElement.querySelector(`.game__content`);

const onGameFormClick = (evt) => {
  let target = evt.target;
  while (target !== gameForm) {
    if (target.classList.contains(ANSWER_CLASS_NAME)) {
      renderScreen(statsScreenElement);
    }
    target = target.parentNode;
  }
};

gameForm.addEventListener(`click`, onGameFormClick);
activateGoHomeButton(gameThreeImageScreenElement);

export default gameThreeImageScreenElement;
