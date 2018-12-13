import {mockQuestions} from "./questions.mock";
import {AnswerBreakPoint, INITIAL_GAME_STATE, MAX_LIVES, MAX_LEVELS} from "./game-utils";

export class Answer {
  constructor(correctness, time) {
    this.isCorrect = correctness;

    if (this.isCorrect) {
      if (time > AnswerBreakPoint.IS_FAST) {
        this.speed = 'fast';
      }

      if (time >= AnswerBreakPoint.IS_SLOW && time <= AnswerBreakPoint.IS_FAST) {
        this.speed = 'normal';
      }

      if (time < AnswerBreakPoint.IS_SLOW) {
        this.speed = 'slow';
      }
    }
  }
}

export const changeLevel = (gameState, level) => {
  if (typeof level !== `number`) {
    throw new Error(`New game level must be a number`);
  }

  if (level < 0) {
    throw new Error(`Level can't be negative`);
  }

  const newGameState = Object.assign({}, gameState, {level});
  return newGameState;
};

export const changeLives = (gameState, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`New game lives must be a number`);
  }

  if (lives < 0) {
    throw new Error(`Lives can't be negative. Game over`);
  }

  if (lives > MAX_LIVES) {
    throw new Error(`Lives can't be too many`);
  }

  const newGameState = Object.assign({}, gameState, {lives});
  return newGameState;
};

export class Timer {
  constructor(time) {
    if (typeof time !== `number`) {
      throw new Error(`Initial time must be a number`);
    }
    if (time <= 0) {
      throw new Error(`Can't create zero or negative timer`);
    }

    this.time = time;
    this.status = ``;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    if (value <= 5) {
      this.status = `blinking`;
    }

    if (value === 0) {
      this.status = `time is over`;
    }

    this._time = value;
  }

  tick() {
    if (this.time <= 0) {
      throw new Error(`Timer time can't be negative`);
    }

    this.time -= 1;
  }
}

export default class Game {
  constructor() {
    this.state = INITIAL_GAME_STATE;
    this.questions = mockQuestions;
    this.answers = [];
  }

  reset() {
    this.state = INITIAL_GAME_STATE;
    this.answers = [];
  }

  changeLives() {
    if (this.state.lives === 0) {
      this.state.isGameOver = true;
      this.state.isWin = false;
    } else {
      this.state = changeLives(this.state, this.state.lives - 1);
    }
  }

  changeLevel() {
    if (this.state.level === MAX_LEVELS - 1) {
      this.state.isGameOver = true;
    } else {
      this.state = changeLevel(this.state, this.state.level + 1);
    }
  }

  onGameStateUpdate() {}

  onGameOver() {}

  onAnswer(correctness, time) {
    const answer = new Answer(correctness, time);
    this.answers.push(answer);

    if (!answer.isCorrect) {
      this.changeLives();
    }

    this.changeLevel();

    if (this.state.isGameOver) {
      this.onGameOver();
      return;
    }

    this.onGameStateUpdate();
  }
}
