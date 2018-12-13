import createDomElementFromStringTemplate from "./create-dom-element";
import {PointsPer} from "./calculate-points";
import {statsTemplate} from "./screen-game";
import {AnswerSpeed} from "./game-utils.js";
import calculateGamePoints from "./calculate-points";

const  StatsTitle = {
  WIN: `Победа!`,
  FAIL: `FAIL`
};

const getStatsTitle = (result) => {
  return result ? StatsTitle.WIN : StatsTitle.FAIL;
};

const statsScreenTemplate = (answers, gameState) => {
  const totalScore = calculateGamePoints(answers, gameState.lives);
  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  const fastAnswers = answers.filter((answer) => answer.speed === AnswerSpeed.FAST);
  const slowAnswers = answers.filter((answer) => answer.speed === AnswerSpeed.SLOW);
  const baseScore = correctAnswers.length * PointsPer.CORRECT_ANSWER;
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
    <h2 class="result__title">
    ${getStatsTitle(gameState.isWin)}
    </h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
        ${statsTemplate(answers)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${gameState.isWin ? baseScore : StatsTitle.FAIL}</td>
      </tr>
      ${fastAnswers.length && gameState.isWin ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers.length} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${PointsPer.FAST_ANSWER}</td>
        <td class="result__total">${fastAnswers.length * PointsPer.FAST_ANSWER}</td>
      </tr>` : ``}
      ${gameState.lives > 0 && gameState.isWin ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${gameState.lives} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${PointsPer.LIVE_LEFT}</td>
        <td class="result__total">${gameState.lives * PointsPer.LIVE_LEFT}</td>
      </tr>` : ``}
      ${slowAnswers.length && gameState.isWin ? `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers.length} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${PointsPer.SLOW_ANSWER}</td>
        <td class="result__total">${slowAnswers.length * PointsPer.SLOW_ANSWER}</td>
      </tr>` : ``}
      ${gameState.isWin ? `<tr>
        <td colspan="5" class="result__total  result__total--final">${totalScore}</td>
      </tr>` : ``}
    </table>
  </section>
  `
};

const statsScreenElement = (answers, gameState) => {
  const template = statsScreenTemplate(answers, gameState);
  const element = createDomElementFromStringTemplate(template);
  return element;
};

export default statsScreenElement;
