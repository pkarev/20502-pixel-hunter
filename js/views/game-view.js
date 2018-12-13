import {AbstractView} from "./abstract-view";
import {MAX_LIVES, questionType, validateFields} from "../game-utils";
import GameProcessStatsView from "./game-process-stats-view";

export default class GameView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
    this.lives = game.state.lives;
    this.time = game.state.time;
    this.level = game.state.level;
    this.question = game.questions[game.state.level];
    this.answers = game.answers;
  }

  get template() {
    return `
      <header class="header">
        ${this.headerTemplate}
      </header>
      <section class="game">
        ${this.questionTemplate}
        ${this.gameProcessStatsTemplate}
      </section>
    `;
  }

  get gameProcessStatsTemplate() {
    const gameProcessStatsView = new GameProcessStatsView(this.game);
    return gameProcessStatsView.template;
  }

  get questionTemplate() {
    switch (this.question.type) {
      case (questionType.GUESS_ONE):
        return `
          ${this.questionOneImageTemplate}
        `;
      case (questionType.GUESS_TWO):
        return `
          ${this.questionTwoImagesTemplate}
        `;
      case (questionType.FIND_PAINTING):
        return `
          ${this.questionThreeImagesTemplate}
        `;
      case (questionType.FIND_PHOTO):
        return `
          ${this.questionThreeImagesTemplate}
        `;
      default:
        return ``;
    }
  }

  get headerTemplate() {
    return `
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      <div class="game__timer">${this.time}</div>
      <div class="game__lives">
        ${new Array(MAX_LIVES - this.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        ${new Array(this.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
      </div>  
    `;
  }

  get questionOneImageTemplate() {
    return `
      <p class="game__task">${this.question.task}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.question.images[0].src}" alt="Option 1" width="705" height="455">
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
  }

  get questionTwoImagesTemplate() {
    return `
      <p class="game__task">${this.question.task}</p>
      <form class="game__content">
        ${this.question.images.map((image, index) => `
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
  }

  get questionThreeImagesTemplate() {
    return `
      <p class="game__task">${this.question.task}</p>
          <form class="game__content  game__content--triple">
          ${this.question.images.map((image, index) => `
            <div class="game__option">
              <img src="${image.src}" alt="Option ${index + 1}" data-image-index="${index}" width="304" height="455">
        </div>
          `).join(``)}
      </form>
    `;
  }

  onAnswer() {}

  onGoHomeClick() {}

  bind() {
    const goHome = this.element.querySelector(`.back`);

    goHome.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.onGoHomeClick();
    });

    switch (this.question.type) {
      case (questionType.GUESS_ONE):
        return this.bindOneImageQuestion();
      case (questionType.GUESS_TWO):
        return this.bindTwoImagesQuestion();
      case (questionType.FIND_PHOTO):
        return this.bindThreeImagesQuestion();
      case (questionType.FIND_PAINTING):
        return this.bindThreeImagesQuestion();
      default:
        return null;
    }
  }

  bindOneImageQuestion() {
    const answerOptions = Array.from(this.element.querySelectorAll(`input`));

    answerOptions.forEach((option) => {
      option.addEventListener(`change`, (evt) => {
        const isPainting = evt.target.value === `paint`;
        const isCorrect = isPainting === this.question.images[0].isPainting;
        this.onAnswer(isCorrect, this.time);
      });
    });
  }

  bindTwoImagesQuestion() {
    const answerOptions = Array.from(this.element.querySelectorAll(`input`));
    answerOptions.forEach((option) => {
      option.addEventListener(`change`, (evt) => {
        let isAllOptionsChosen = validateFields(answerOptions);
        const isPainting = evt.target.value === `paint`;
        const isCorrect = isPainting === this.question.images[evt.target.dataset.imageIndex].isPainting;

        if (isAllOptionsChosen || !isCorrect) {
          this.onAnswer(isCorrect, this.time);
        }
      });
    });
  }

  bindThreeImagesQuestion() {
    const gameOptions = this.element.querySelectorAll(`img`);
    gameOptions.forEach((option) => {
      option.addEventListener(`click`, (evt) => {
        let isCorrect;
        if (this.question.type === questionType.FIND_PAINTING) {
          isCorrect = this.question.images[evt.target.dataset.imageIndex].isPainting === true;
        } else {
          isCorrect = this.question.images[evt.target.dataset.imageIndex].isPainting === false;
        }

        this.onAnswer(isCorrect, this.time);
      });
    });
  }
}
