import Timer, {ANSWERS_NORMAL_LENGTH} from "../utils/game";
import {
  INITIAL_GAME_STATE,
  MAX_LEVELS,
  TIME_PER_QUESTION,
  changeLevel,
  changeLives, AnswerBreakPoint, AnswerType,
} from "../utils/game";

export default class GameModel {
  constructor(gameQuestions, userName) {
    this.restart();
    this._userName = userName;
    this._questions = gameQuestions;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_GAME_STATE);
    this._timer = new Timer(TIME_PER_QUESTION);
    this._answers = Array.from({length: ANSWERS_NORMAL_LENGTH}, () => `unknown`);
  }

  get currentQuestion() {
    return this._questions[this.level];
  }

  get state() {
    return Object.freeze(this._state);
  }

  get level() {
    return this._state.level;
  }

  get lives() {
    return this._state.lives;
  }

  get hasNextLevel() {
    return this._state.level < MAX_LEVELS - 1;
  }

  get playerName() {
    return this._userName;
  }

  get time() {
    return this._timer.time;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this.level + 1);
  }

  reduceLives() {
    this._state = changeLives(this._state, this.lives - 1);
  }

  addNewAnswer(isCorrect) {
    this._answers[this.level] = this.getAnswer(isCorrect);
  }

  getAnswer(isCorrect) {
    let answer;

    if (this.time > AnswerBreakPoint.IS_FAST) {
      answer = AnswerType.FAST;
    }

    if (this.time >= AnswerBreakPoint.IS_SLOW && this.time <= AnswerBreakPoint.IS_FAST) {
      answer = AnswerType.CORRECT;
    }

    if (this.time < AnswerBreakPoint.IS_SLOW) {
      answer = AnswerType.SLOW;
    }

    if (!isCorrect || undefined) {
      answer = AnswerType.WRONG;
    }

    return answer;
  }
}
