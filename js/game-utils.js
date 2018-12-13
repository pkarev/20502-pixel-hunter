export const MAX_LIVES = 3;
export const MAX_LEVELS = 10;
export const TIME_PER_QUESTION = 30;

export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: TIME_PER_QUESTION,
  isWin: true
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

export const questionType = {
  GUESS_ONE: `guess-one`,
  GUESS_TWO: `guess-two`,
  FIND_PAINTING: `find-painting`,
  FIND_PHOTO: `find-photo`
};

export const questionTypeToTask = {
  [questionType.GUESS_ONE]: `Угадай, фото или рисунок?`,
  [questionType.GUESS_TWO]: `Угадайте для каждого изображения фото или рисунок?`,
  [questionType.FIND_PAINTING]: `Найдите рисунок среди изображений`,
  [questionType.FIND_PHOTO]: `Найдите фотографию среди изображений`,
};
