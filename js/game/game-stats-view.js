import {AbstractView} from "../views/abstract-view";
import {AnswerSpeed} from "./game-utils";

const getStatsClass = (answer) => {
  if (answer.isCorrect === undefined) {
    return `unknown`;
  }

  if (!answer.isCorrect) {
    return `wrong`;
  }

  switch (answer.speed) {
    case AnswerSpeed.FAST:
      return `fast`;
    case AnswerSpeed.NORMAL:
      return `correct`;
    case AnswerSpeed.SLOW:
      return `slow`;
    default:
      return ``;
  }
};

export default class StatsView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    return `
    <ul class="stats">
        ${this.answers.map((answer) => `<li class="stats__result stats__result--${getStatsClass(answer)}"></li>`).join(``)}
    </ul>
    `;
  }
}
