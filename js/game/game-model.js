import {INITIAL_GAME_STATE, changeLevel, TIME_PER_QUESTION, Timer} from "./game-utils";
import {mockQuestions} from "../questions.mock";

export default class GameModel {
  constructor() {
    this.restart();
  }

  restart() {
    this._state = INITIAL_GAME_STATE;
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

  nextLevel() {
    this._state = changeLevel(this._state, this.level + 1);
  }

  get isDead() {
    return this._state.lives < 0;
  }

}
