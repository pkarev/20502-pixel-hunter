import AbstractView from "../utils/abstract-view";
import StatsView from "./game-stats-view";
import {ANSWERS_NORMAL_LENGTH, AnswerType, calculateGamePoints, PointsPer} from "../utils/game";

const StatsTitle = {
  WIN: `Победа!`,
  FAIL: `FAIL`
};

const getStatsTitle = (game) => {
  if ((game.answers.length = ANSWERS_NORMAL_LENGTH) && (game.lives >= 0)) {
    return StatsTitle.WIN;
  }

  return StatsTitle.FAIL;
};

const getCorrectAnswersNumber = (answers) => answers.filter((answer) => answer === AnswerType.CORRECT
  || answer === AnswerType.SLOW
  || answer === AnswerType.FAST).length;
const getFastAnswersNumber = (answers) => answers.filter((answer) => answer === AnswerType.FAST).length;
const getSlowAnswersNumber = (answers) => answers.filter((answer) => answer === AnswerType.SLOW).length;

const getGameProcessStatsTemplate = (answers) => {
  const statsView = new StatsView(answers);
  return statsView.template;
};

const getBaseScore = (answers) => {
  return getCorrectAnswersNumber(answers) * PointsPer.CORRECT_ANSWER;
};

const isWin = (lives) => lives >= 0;

export default class ScoresView extends AbstractView {
  constructor(gamesHistory) {
    super();
    this.history = gamesHistory;
  }

  get template() {
    return `
    <header class="header">
    </header>
    ${this.history.map((game, index) => `
      <section class="result">
        <h2 class="result__title">${getStatsTitle(game)}</h2>
        <table class="result__table">
          <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
              ${getGameProcessStatsTemplate(game.answers)}
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${isWin(game.lives) ? getBaseScore(game.answers) : StatsTitle.FAIL}</td>
        </tr>
        ${getFastAnswersNumber(game.answers) && isWin(game.lives) ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${getFastAnswersNumber(game.answers)} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× ${PointsPer.FAST_ANSWER}</td>
          <td class="result__total">${getFastAnswersNumber(game.answers) * PointsPer.FAST_ANSWER}</td>
        </tr>` : ``}
        ${game.lives > 0 && isWin(game.lives) ? `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${game.lives}
            <span class="stats__result stats__result--alive"></span>
            </td>
          <td class="result__points">× ${PointsPer.LIVE_LEFT}</td>
          <td class="result__total">${game.lives * PointsPer.LIVE_LEFT}</td>
        </tr>` : ``}
        ${getSlowAnswersNumber(game.answers) && isWin(game.lives) ? `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${getSlowAnswersNumber(game.answers)} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× ${PointsPer.SLOW_ANSWER}</td>
          <td class="result__total">${getSlowAnswersNumber(game.answers) * PointsPer.SLOW_ANSWER}</td>
        </tr>` : ``}
        ${isWin(game.lives) ? `<tr>
          <td colspan="5" class="result__total  result__total--final">${calculateGamePoints(game.answers, game.lives)}</td>
          </tr>` : ``}
        </table>
      </section>`).join(``)}`;
  }
}
