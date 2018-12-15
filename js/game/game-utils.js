export const MAX_LIVES = 3;
export const MAX_LEVELS = 10;
export const TIME_PER_QUESTION = 30;

export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: TIME_PER_QUESTION,
  isGameOver: false,
  isWin: true,
});

export const AnswerBreakPoint = {
  IS_SLOW: 10,
  IS_FAST: 20,
};

export const AnswerSpeed = {
  FAST: `fast`,
  NORMAL: `normal`,
  SLOW: `slow`
};

const KeyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

export const QuestionType = {
  GUESS_ONE: `guess-one`,
  GUESS_TWO: `guess-two`,
  FIND_PAINTING: `find-painting`,
  FIND_PHOTO: `find-photo`
};

export const QuestionTypeToTask = {
  [QuestionType.GUESS_ONE]: `Угадай, фото или рисунок?`,
  [QuestionType.GUESS_TWO]: `Угадайте для каждого изображения фото или рисунок?`,
  [QuestionType.FIND_PAINTING]: `Найдите рисунок среди изображений`,
  [QuestionType.FIND_PHOTO]: `Найдите фотографию среди изображений`,
};

export const ANSWERS_NORMAL_LENGTH = 10;

export const PointsPer = {
  LIVE_LEFT: 50,
  CORRECT_ANSWER: 100,
  FAST_ANSWER: 50,
  SLOW_ANSWER: -50
};

export const isLeftArrowKeyup = (evt, action) => {
  if (evt.keyCode !== KeyCode.LEFT_ARROW) {
    return;
  }
  action();
};

export const isRightArrowKeyup = (evt, action) => {
  if (evt.keyCode !== KeyCode.RIGHT_ARROW) {
    return;
  }
  action();
};

export const validateFields = (formFields) => {
  let isAllFieldsValid = true;
  formFields.forEach((formField) => {
    isAllFieldsValid = formField.checkValidity() ? isAllFieldsValid : formField.checkValidity();
  });

  return isAllFieldsValid;
};

export const calculateGamePoints = (answers, livesLeft) => {
  let points = 0;

  if (answers.length < ANSWERS_NORMAL_LENGTH) {
    return -1;
  }

  if (answers.length > ANSWERS_NORMAL_LENGTH) {
    return -1;
  }

  for (const answer of answers) {
    if (answer.isCorrect) {
      points += PointsPer.CORRECT_ANSWER;
    }
    if (answer.speed === AnswerSpeed.FAST) {
      points += PointsPer.FAST_ANSWER;
    }
    if (answer.speed === AnswerSpeed.SLOW) {
      points += PointsPer.SLOW_ANSWER;
    }
  }

  points += livesLeft * PointsPer.LIVE_LEFT;

  return points;
};

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

export class Answer {
  constructor(correctness, time) {
    this.isCorrect = correctness;

    if (this.isCorrect) {
      if (time > AnswerBreakPoint.IS_FAST) {
        this.speed = `fast`;
      }

      if (time >= AnswerBreakPoint.IS_SLOW && time <= AnswerBreakPoint.IS_FAST) {
        this.speed = `normal`;
      }

      if (time < AnswerBreakPoint.IS_SLOW) {
        this.speed = `slow`;
      }
    }
  }
}

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
