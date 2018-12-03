export const MAX_LIVES = 3;
const TIME_PER_QUESTION = 30;

export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: TIME_PER_QUESTION,
});

const AnswerBreakPoint = {
  IS_SLOW: 10,
  IS_FAST: 20,
};

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
