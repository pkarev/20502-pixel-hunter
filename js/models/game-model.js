import {
  INITIAL_GAME_STATE,
  MAX_LEVELS,
  TIME_PER_QUESTION,
  Timer,
  Answer,
  changeLevel,
  changeLives,
} from "../utils/game";
import {mockQuestions} from "../utils/questions.mock";

export default class GameModel {
  constructor(userName) {
    this.restart();
    this._userName = userName;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_GAME_STATE);
    this._timer = new Timer(TIME_PER_QUESTION);
    this._answers = [];
    this._questions = mockQuestions;
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

  loose() {
    this._state.isWin = false;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this.level + 1);
  }

  reduceLives() {
    this._state = changeLives(this._state, this.lives - 1);
  }

  newAnswer(answer) {
    this._answers.push(new Answer(answer, this._timer.time));
  }

  newUndefinedAnswer() {
    this._answers.push({});
  }
}
