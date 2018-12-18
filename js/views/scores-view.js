import {AnswerSpeed} from "../utils/game.js";
import {AbstractView} from "../utils/abstract-view";
import StatsView from "./game-stats-view";
import {calculateGamePoints, PointsPer} from "../utils/game";

const StatsTitle = {
  WIN: `Победа!`,
  FAIL: `FAIL`
};

const getStatsTitle = (result) => {
  return result ? StatsTitle.WIN : StatsTitle.FAIL;
};


export default class ScoresView extends AbstractView {
  constructor(model) {
    super();
    this.game = model;
    this.totalScore = calculateGamePoints(this.game._answers, this.game._state.lives);
    this.correctAnswers = this.game._answers.filter((answer) => answer.isCorrect);
    this.fastAnswers = this.game._answers.filter((answer) => answer.speed === AnswerSpeed.FAST);
    this.slowAnswers = this.game._answers.filter((answer) => answer.speed === AnswerSpeed.SLOW);
    this.baseScore = this.correctAnswers.length * PointsPer.CORRECT_ANSWER;
  }

  get gameProcessStatsTemplate() {
    const statsView = new StatsView(this.game._answers);
    return statsView.template;
  }

  get template() {
    return `
    <header class="header">
    </header>
    <section class="result">
      <h2 class="result__title">${getStatsTitle(this.game.state.isWin)}</h2>
      <table class="result__table">
        <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
            ${this.gameProcessStatsTemplate}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${this.game.state.isWin ? this.baseScore : StatsTitle.FAIL}</td>
      </tr>
      ${this.fastAnswers.length && this.game.state.isWin ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.fastAnswers.length} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${PointsPer.FAST_ANSWER}</td>
        <td class="result__total">${this.fastAnswers.length * PointsPer.FAST_ANSWER}</td>
      </tr>` : ``}
      ${this.game.state.lives > 0 && this.game.state.isWin ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.game.state.lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× ${PointsPer.LIVE_LEFT}</td>
    <td class="result__total">${this.game.state.lives * PointsPer.LIVE_LEFT}</td>
      </tr>` : ``}
      ${this.slowAnswers.length && this.game.state.isWin ? `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this.slowAnswers.length} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× ${PointsPer.SLOW_ANSWER}</td>
    <td class="result__total">${this.slowAnswers.length * PointsPer.SLOW_ANSWER}</td>
      </tr>` : ``}
      ${this.game.state.isWin ? `<tr>
        <td colspan="5" class="result__total  result__total--final">${this.totalScore}</td>
      </tr>` : ``}
      </table>
      </section>
    `;
  }
}
