import createDomElementFromStringTemplate from "./create-dom-element";
import {validateFields} from "./util";
import renderScreen from "./render-screen";
import activateGoHomeButton from "./go-home";
import {changeLevel, MAX_LIVES, MAX_LEVELS, changeLives, Answer} from "./game";
import {mockQuestions} from "./questions.mock";
import statsScreenElement from "./screen-stats";
import {currentGameAnswers} from "./main";

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

const questionTwoImagesTemplate = (question) => `
<p class="game__task">${question.task}</p>
<form class="game__content">
  ${question.images.map((image, index) => `
  <div class="game__option">
    <img src="${image.src}" alt="Option ${index + 1}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo" required>
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint" required>
      <span>Рисунок</span>
    </label>
  </div>
  `).join(``)}
</form>
`;

const questionThreeImagesTemplate = (question) => `
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

export const gameScreenElement = (gameState) => {
  const question = mockQuestions[gameState.level];

  const activateGameOneImageElement = (element) => {
    const answerOptions = Array.from(element.querySelectorAll(`input`));
    const nextLevel = gameState.level < MAX_LEVELS - 1 ? gameState.level + 1 : null;

    answerOptions.forEach((option) => {
      option.addEventListener(`change`, (evt) => {
        const isPainting = evt.target.value === `paint`;
        const isCorrect = isPainting === question.images[0].isPainting;
        const answer = new Answer(isCorrect, gameState.time);
        currentGameAnswers.push(answer);

        if (!isCorrect) {
          gameState = changeLives(gameState, gameState.lives - 1);
        }

        if (!nextLevel) {
          renderScreen(statsScreenElement);
          return;
        }

        gameState = changeLevel(gameState, nextLevel);
        renderScreen(gameScreenElement(gameState));
      });
    });
  };

  const activateGameTwoImagesElement = (element) => {
    const answers = Array.from(element.querySelectorAll(`input`));

    answers.forEach((answer) => {
      answer.addEventListener(`change`, () => {
        let isFormValid = validateFields(answers);
        if (!isFormValid) {
          return;
        }

        if (gameState.level === MAX_LEVELS - 1) {
          renderScreen(statsScreenElement);
          return;
        }

        const newLevel = gameState.level + 1;
        gameState = changeLevel(gameState, newLevel);
        renderScreen(gameScreenElement(gameState));
      });
    });
  };

  const activateGameThreeImagesElement = (element) => {
    const gameForm = element.querySelector(`.game__content`);
    const ANSWER_CLASS_NAME = `game__option`;

    const onGameFormClick = (evt) => {
      let target = evt.target;
      while (target !== gameForm) {
        if (gameState.level === MAX_LEVELS - 1) {
          renderScreen(statsScreenElement);
          return;
        }

        if (target.classList.contains(ANSWER_CLASS_NAME)) {
          const newLevel = gameState.level + 1;
          gameState = changeLevel(gameState, newLevel);
          renderScreen(gameScreenElement(gameState));
        }

        target = target.parentNode;
      }
    };

    gameForm.addEventListener(`click`, onGameFormClick);
  };

  let gameType = null;

  const getGameTemplate = () => {
    let template;
    switch (question.images.length) {
      case 1:
        gameType = 1;
        template = questionOneImageTemplate(question);
        return template;
      case 2:
        gameType = 2;
        template = questionTwoImagesTemplate(question);
        return template;
      case 3:
        gameType = 3;
        template = questionThreeImagesTemplate(question);
        return template;
    }
  };

  const template =  `
    <header class="header">
      ${headerTemplate(gameState)}
    </header>
    <section class="game">
      ${getGameTemplate()}
      ${statsTemplate}
    </section>
  `;

  const element = createDomElementFromStringTemplate(template);

  if (gameType === 1) {
    activateGameOneImageElement(element);
  } else if (gameType ===2) {
    activateGameTwoImagesElement(element);
  } else if (gameType ==3) {
    activateGameThreeImagesElement(element);
  }

  activateGoHomeButton(element);

  return element;
};
