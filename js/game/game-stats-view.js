import {AbstractView} from "../views/abstract-view";
import {getStatsClass} from "./game-level-view";

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
