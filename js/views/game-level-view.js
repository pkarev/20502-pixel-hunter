import AbstractView from "../utils/abstract-view";
import {ImageType, QuestionTask, validateFields} from "../utils/game";
import StatsView from "./game-stats-view";

export default class LevelView extends AbstractView {
  constructor(model) {
    super();
    this.level = model.currentQuestion;
    this.answers = model.answers;
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
    switch (this.level.question) {
      case (QuestionTask.GUESS_ONE):
        return `
          ${this.questionOneImageTemplate}
        `;
      case (QuestionTask.GUESS_TWO):
        return `
          ${this.questionTwoImagesTemplate}
        `;
      case (QuestionTask.FIND_PAINTING):
        return `
          ${this.questionThreeImagesTemplate}
        `;
      case (QuestionTask.FIND_PHOTO):
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
      <p class="game__task">${this.level.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.level.answers[0].image.url}" alt="Option 1" width="705" height="455">
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
      <p class="game__task">${this.level.question}</p>
      <form class="game__content">
        ${this.level.answers.map((answer, index) => `
        <div class="game__option">
          <img src="${answer.image.url}" alt="Option ${index + 1}" width="468" height="458">
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
      <p class="game__task">${this.level.question}</p>
          <form class="game__content  game__content--triple">
          ${this.level.answers.map((answer, index) => `
            <div class="game__option">
              <img src="${answer.image.url}" alt="Option ${index + 1}" data-image-index="${index}" width="304" height="455">
        </div>
          `).join(``)}
      </form>
    `;
  }

  bind() {

    switch (this.level.question) {
      case (QuestionTask.GUESS_ONE):
        return this.bindOneImageQuestion();
      case (QuestionTask.GUESS_TWO):
        return this.bindTwoImagesQuestion();
      case (QuestionTask.FIND_PHOTO):
        return this.bindThreeImagesQuestion();
      case (QuestionTask.FIND_PAINTING):
        return this.bindThreeImagesQuestion();
      default:
        return null;
    }
  }

  bindOneImageQuestion() {
    const answerOptions = Array.from(this.element.querySelectorAll(`input`));

    answerOptions.forEach((option) => {
      option.addEventListener(`change`, (evt) => {
        const imageType = evt.target.value === `paint` ? ImageType.PAINTING : ImageType.PHOTO;
        const isCorrect = imageType === this.level.answers[0].type;
        this.onAnswer(isCorrect);
      });
    });
  }

  bindTwoImagesQuestion() {
    const answerOptions = Array.from(this.element.querySelectorAll(`input`));
    const levelQuestions = Array.from(this.element.querySelectorAll(`.game__option`));
    let isBothOptionsCorrect = true;

    answerOptions.forEach((option) => {
      option.addEventListener(`change`, () => {
        let isAllOptionsChosen = validateFields(answerOptions);

        if (!isAllOptionsChosen) {
          return;
        }

        for (const question of levelQuestions) {
          const imageType = question.querySelector(`input`).checked ? ImageType.PHOTO : ImageType.PAINTING;
          const isCurrentOptionCorrect = imageType === this.level.answers[levelQuestions.indexOf(question)].type;
          if (!isCurrentOptionCorrect) {
            isBothOptionsCorrect = false;
            break;
          }
        }

        this.onAnswer(isBothOptionsCorrect);
      });
    });
  }

  bindThreeImagesQuestion() {
    const gameOptions = this.element.querySelectorAll(`img`);
    gameOptions.forEach((option) => {
      option.addEventListener(`click`, (evt) => {
        let isCorrect;
        if (this.level.question === QuestionTask.FIND_PAINTING) {
          isCorrect = this.level.answers[evt.target.dataset.imageIndex].type === ImageType.PAINTING;
        } else {
          isCorrect = this.level.answers[evt.target.dataset.imageIndex].type === ImageType.PHOTO;
        }

        this.onAnswer(isCorrect);
      });
    });
  }
}
