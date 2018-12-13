import {AnswerSpeed} from "../game-utils";
import {AbstractView} from "./abstract-view";

const getStatsClass = (answer) => {
  if (!answer.isCorrect) {
    return `wrong`;
  }

  switch (answer.speed) {
    case AnswerSpeed.FAST:
      return `fast`;
    case AnswerSpeed.NORMAL:
      return `normal`;
    case AnswerSpeed.SLOW:
      return `slow`;
    default:
      return ``;
  }
};

export default class GameProcessStatsView extends AbstractView {
  constructor(game) {
    super();
    this.answers = game.answers;
  }

  get template() {
    return `
    <ul class="stats">
        ${this.answers.map((answer) => `<li class="stats__result stats__result--${getStatsClass(answer)}"></li>`).join(``)}
    </ul>
    `;
  }
}
