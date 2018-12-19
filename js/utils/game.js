export const MAX_LIVES = 3;
export const MAX_LEVELS = 10;
export const TIME_PER_QUESTION = 30;
export const TIME_START_BLINKING = 5;
export const ONE_SECOND = 1000;
export const ANSWERS_NORMAL_LENGTH = 10;

export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
  isGameOver: false,
  isWin: true,
});

export const AnswerBreakPoint = {
  IS_SLOW: 10,
  IS_FAST: 20,
};

export const AnswerType = {
  CORRECT: `correct`,
  WRONG: `wrong`,
  SLOW: `slow`,
  FAST: `fast`
};

export const ImageType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

export const QuestionTask = {
  FIND_PHOTO: `Найдите фото среди изображений`,
  FIND_PAINTING: `Найдите рисунок среди изображений`,
  GUESS_TWO: `Угадайте для каждого изображения фото или рисунок?`,
  GUESS_ONE: `Угадай, фото или рисунок?`
};

export const PointsPer = {
  LIVE_LEFT: 50,
  CORRECT_ANSWER: 100,
  FAST_ANSWER: 50,
  SLOW_ANSWER: -50
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
    if (answer === AnswerType.CORRECT) {
      points += PointsPer.CORRECT_ANSWER;
    }
    if (answer === AnswerType.FAST) {
      points += PointsPer.FAST_ANSWER + PointsPer.CORRECT_ANSWER;
    }
    if (answer === AnswerType.SLOW) {
      points += PointsPer.SLOW_ANSWER + PointsPer.CORRECT_ANSWER;
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

  if (lives > MAX_LIVES) {
    throw new Error(`Lives can't be too many`);
  }

  const newGameState = Object.assign({}, gameState, {lives});
  return newGameState;
};

export default class Timer {
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
    this._time = value;
  }

  tick() {
    if (this.time <= 0) {
      throw new Error(`Timer time can't be negative`);
    }

    this.time -= 1;
  }

  reset() {
    this.time = TIME_PER_QUESTION;
  }
}
