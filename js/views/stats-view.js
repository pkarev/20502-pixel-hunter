import {PointsPer} from "../calculate-points";
import {AnswerSpeed} from "../game-utils.js";
import calculateGamePoints from "../calculate-points";
import {AbstractView} from "./abstract-view";
import GameProcessStatsView from "./game-process-stats-view";

const StatsTitle = {
  WIN: `Победа!`,
  FAIL: `FAIL`
};

const getStatsTitle = (result) => {
  return result ? StatsTitle.WIN : StatsTitle.FAIL;
};


export default class StatsView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
    this.totalScore = calculateGamePoints(this.game.answers, this.game.state.lives);
    this.correctAnswers = this.game.answers.filter((answer) => answer.isCorrect);
    this.fastAnswers = this.game.answers.filter((answer) => answer.speed === AnswerSpeed.FAST);
    this.slowAnswers = this.game.answers.filter((answer) => answer.speed === AnswerSpeed.SLOW);
    this.baseScore = this.correctAnswers.length * PointsPer.CORRECT_ANSWER;
  }

  get gameProcessStatsTemplate() {
    const gameProcessStatsView = new GameProcessStatsView(this.game);
    return gameProcessStatsView.template;
  }

  get template() {
    return `
    <header class="header">
      <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
      </button>
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

  onGoHomeClick() {}

  bind() {
    const goHome = this.element.querySelector(`.back`);

    goHome.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.onGoHomeClick();
    });
  }
}
