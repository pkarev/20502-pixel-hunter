import createDomElementFromStringTemplate from "./create-dom-element";
import {validateFields} from "./util";
import renderScreen from "./render-screen";
import activateGoHomeButton from "./go-home";
import {changeLevel, MAX_LIVES, MAX_LEVELS, changeLives, Answer, AnswerSpeed} from "./game";
import {mockQuestions, questionType} from "./questions.mock";
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
      <input class="visually-hidden" name="question${index + 1}" data-image-index="${index}" type="radio" value="photo" required>
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" data-image-index="${index}" type="radio" value="paint" required>
      <span>Рисунок</span>
    </label>
  </div>
  `).join(``)}
</form>
`;

const questionThreeImagesTemplate = (question) => `
<p class="game__task">${question.task}</p>
<form class="game__content  game__content--triple">
  ${question.images.map((image, index) => `
    <div class="game__option">
      <img src="${image.src}" alt="Option ${index + 1}" data-image-index="${index}" width="304" height="455">
    </div>
  `).join(``)}
</form>
`;

const getStatsClass = (answer) => {
  if (!answer.isCorrect) {
    return `wrong`
  }

  switch (answer.speed) {
    case AnswerSpeed.FAST:
      return `fast`;
    case AnswerSpeed.NORMAL:
      return `normal`;
    case AnswerSpeed.SLOW:
      return `slow`
  }
};

const statsTemplate = (answers) => `
<ul class="stats">
  ${answers.map((answer) => ` 
  <li class="stats__result stats__result--${getStatsClass(answer)}"></li>
  `
  ).join(``)}
</ul>
`;

export const gameScreenElement = (gameState) => {
  const question = mockQuestions[gameState.level];
  const nextLevel = gameState.level < MAX_LEVELS - 1 ? gameState.level + 1 : null;

  const activateGameOneImageElement = (element) => {
    const answerOptions = Array.from(element.querySelectorAll(`input`));

    answerOptions.forEach((option) => {
      option.addEventListener(`change`, (evt) => {
        const isPainting = evt.target.value === `paint`;
        const isCorrect = isPainting === question.images[0].isPainting;
        const answer = new Answer(isCorrect, gameState.time);
        currentGameAnswers.push(answer);

        if (!isCorrect) {
          if (gameState.lives > 0) {
            gameState = changeLives(gameState, gameState.lives - 1);
          } else {
            gameOver();
            return;
          }
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

  const gameOver = () => {
    renderScreen(statsScreenElement);
  };

  const activateGameTwoImagesElement = (element) => {
    const answerOptions = Array.from(element.querySelectorAll(`input`));
    answerOptions.forEach((option) => {
      option.addEventListener(`change`, (evt) => {
        let isAllOptionsChosen = validateFields(answerOptions);
        const isPainting = evt.target.value === `paint`;
        const isCorrect = isPainting === question.images[evt.target.dataset.imageIndex].isPainting;
        let answer = new Answer(isCorrect, gameState.time);

        if (!isCorrect) {
          currentGameAnswers.push(answer);
          if (gameState.lives > 0) {
            gameState = changeLives(gameState, gameState.lives - 1);
          } else {
            gameOver();
            return;
          }

          if (!nextLevel) {
            renderScreen(statsScreenElement);
            return;
          }

          gameState = changeLevel(gameState, nextLevel);
          renderScreen(gameScreenElement(gameState));
          return;
        }

        if (!isAllOptionsChosen) {
          return;
        }

        currentGameAnswers.push(answer);
        if (!nextLevel) {
          renderScreen(statsScreenElement);
          return;
        }

        gameState = changeLevel(gameState, nextLevel);
        renderScreen(gameScreenElement(gameState));
      });
    });
  };

  const activateGameThreeImagesElement = (element) => {
    const gameOptions = element.querySelectorAll(`img`);

    gameOptions.forEach((option, index) => {
      option.addEventListener(`click`, (evt) => {
        let isCorrect;
        if (question.type === questionType.FIND_PAINTING) {
          isCorrect = question.images[evt.target.dataset.imageIndex].isPainting === true;
        } else {
          isCorrect = question.images[evt.target.dataset.imageIndex].isPainting === false;
        }

        let answer = new Answer(isCorrect, gameState.time);
        currentGameAnswers.push(answer);

        if (!isCorrect) {
          if (gameState.lives > 0) {
            gameState = changeLives(gameState, gameState.lives - 1);
          } else {
            gameOver();
            return;
          }
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
      ${statsTemplate(currentGameAnswers)}
    </section>
  `;

  const element = createDomElementFromStringTemplate(template);

  if (gameType === 1) {
    activateGameOneImageElement(element);
  } else if (gameType === 2) {
    activateGameTwoImagesElement(element);
  } else if (gameType === 3) {
    activateGameThreeImagesElement(element);
  }

  activateGoHomeButton(element);

  return element;
};
