import AbstractView from "../utils/abstract-view";
import {AnswerType} from "../utils/game";

const getStatsClass = (answer) => {
  switch (answer) {
    case (AnswerType.CORRECT):
      return `correct`;
    case (AnswerType.WRONG):
      return `wrong`;
    case (AnswerType.FAST):
      return `fast`;
    case (AnswerType.SLOW):
      return `slow`;
    case (AnswerType.UNKNOWN):
      return `unknown`;
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
