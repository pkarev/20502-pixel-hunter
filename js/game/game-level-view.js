import {AbstractView} from "../views/abstract-view";
import {QuestionType, validateFields} from "./game-utils";
import StatsView from "./game-stats-view";

export default class LevelView extends AbstractView {
  constructor(model) {
    super();
    this.question = model.currentQuestion;
    this.answers = model._answers;
  }

  get template() {
    return `
      <section class="game">
        ${this.questionTemplate}
        ${this.statsTemplate}
      </section>
    `;
  }

  get questionTemplate() {
    switch (this.question.type) {
      case (QuestionType.GUESS_ONE):
        return `
          ${this.questionOneImageTemplate}
        `;
      case (QuestionType.GUESS_TWO):
        return `
          ${this.questionTwoImagesTemplate}
        `;
      case (QuestionType.FIND_PAINTING):
        return `
          ${this.questionThreeImagesTemplate}
        `;
      case (QuestionType.FIND_PHOTO):
        return `
          ${this.questionThreeImagesTemplate}
        `;
      default:
        return ``;
    }
  }

  get statsTemplate() {
    const statsView = new StatsView(this.answers);
    return statsView.template;
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

  bind() {

    switch (this.question.type) {
      case (QuestionType.GUESS_ONE):
        return this.bindOneImageQuestion();
      case (QuestionType.GUESS_TWO):
        return this.bindTwoImagesQuestion();
      case (QuestionType.FIND_PHOTO):
        return this.bindThreeImagesQuestion();
      case (QuestionType.FIND_PAINTING):
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
        this.onAnswer(isCorrect);
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

        if (!isCorrect && !isAllOptionsChosen) {
          this.onAnswer(isCorrect);
          return;
        }

        if (isAllOptionsChosen) {
          this.onAnswer(isCorrect);
        }
      });
    });
  }

  bindThreeImagesQuestion() {
    const gameOptions = this.element.querySelectorAll(`img`);
    gameOptions.forEach((option) => {
      option.addEventListener(`click`, (evt) => {
        let isCorrect;
        if (this.question.type === QuestionType.FIND_PAINTING) {
          isCorrect = this.question.images[evt.target.dataset.imageIndex].isPainting === true;
        } else {
          isCorrect = this.question.images[evt.target.dataset.imageIndex].isPainting === false;
        }

        this.onAnswer(isCorrect);
      });
    });
  }
}
