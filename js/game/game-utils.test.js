import {assert} from 'chai';
import {
  ANSWERS_NORMAL_LENGTH,
  AnswerSpeed,
  INITIAL_GAME_STATE,
  calculateGamePoints,
  changeLevel,
  changeLives,
  Timer
} from './game-utils';
const Answer = function (isCorrect, speed) {
  this.isCorrect = isCorrect;
  this.speed = speed;
};

const generateMockAnswers = (isCorrect, speed) => {
  let answers = [];
  for (let i = 0; i < ANSWERS_NORMAL_LENGTH; i++) {
    answers.push(new Answer(isCorrect, speed));
  }

  return answers;
};

const allCorrectNormal = generateMockAnswers(true, AnswerSpeed.NORMAL);
const allCorrectFast = generateMockAnswers(true, AnswerSpeed.FAST);
const allCorrectSlow = generateMockAnswers(true, AnswerSpeed.SLOW);
const allIncorrectNormal = generateMockAnswers(false, AnswerSpeed.NORMAL);
const allIncorrectFast = generateMockAnswers(false, AnswerSpeed.FAST);
const allIncorrectSlow = generateMockAnswers(false, AnswerSpeed.SLOW);
const notEnoughAnswers = new Array(5);
const emptyAnswers = [];
const tooManyAnswers = [];

describe(`Change level`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME_STATE, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME_STATE, 10).level, 10);
    assert.equal(changeLevel(INITIAL_GAME_STATE, 101).level, 101);
  });

  it(`should not accept negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME_STATE, -1).level, /Level can't be negative/);
    assert.throws(() => changeLevel(INITIAL_GAME_STATE, -77).level, /Level can't be negative/);
    assert.throws(() => changeLevel(INITIAL_GAME_STATE, -123).level, /Level can't be negative/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME_STATE, []).level, /New game level must be a number/);
    assert.throws(() => changeLevel(INITIAL_GAME_STATE, {}).level, /New game level must be a number/);
    assert.throws(() => changeLevel(INITIAL_GAME_STATE, undefined).level, /New game level must be a number/);
  });
});

describe(`Change lives`, () => {
  it(`should update lives of the game`, () => {
    assert.equal(changeLives(INITIAL_GAME_STATE, 1).lives, 1);
    assert.equal(changeLives(INITIAL_GAME_STATE, 2).lives, 2);
    assert.equal(changeLives(INITIAL_GAME_STATE, 3).lives, 3);
  });

  it(`should no accept negative values`, () => {
    assert.throws(() => changeLives(INITIAL_GAME_STATE, -1).lives, /Lives can't be negative. Game over/);
  });

  it(`should not set lives more than allowed max lives number`, () => {
    assert.throws(() => changeLives(INITIAL_GAME_STATE, 4).lives, `Lives can't be too many`);
    assert.throws(() => changeLives(INITIAL_GAME_STATE, 100).lives, `Lives can't be too many`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLives(INITIAL_GAME_STATE, []).lives, /New game lives must be a number/);
    assert.throws(() => changeLives(INITIAL_GAME_STATE, {}).lives, /New game lives must be a number/);
    assert.throws(() => changeLives(INITIAL_GAME_STATE, undefined).lives, /New game lives must be a number/);
  });
});

describe(`Timer`, () => {
  it(`can't be created with zero or negative initial time`, () => {
    assert.throws(() => new Timer(0), `Can't create zero or negative timer`);
    assert.throws(() => new Timer(-1), `Can't create zero or negative timer`);
  });

  it(`can't accept initial time as non-number`, () => {
    assert.throws(() => new Timer([]), `Initial time must be a number`);
    assert.throws(() => new Timer({}), `Initial time must be a number`);
    assert.throws(() => new Timer(undefined), `Initial time must be a number`);
  });

  it(`must reduce initial time by 1 each tick`, () => {
    const testTimer = new Timer(100);
    testTimer.tick();
    assert.equal(testTimer.time, 99);
    testTimer.tick();
    assert.equal(testTimer.time, 98);
    testTimer.tick();
    assert.equal(testTimer.time, 97);
  });

  it(`must not set negative time after the time is over`, () => {
    const testTimer = new Timer(1);
    testTimer.tick();
    assert.throws(() => testTimer.tick(), /Timer time can't be negative/);
  });
});

describe(`Calculate game points`, () => {
  it(`should calculate points correct`, () => {
    assert.equal(calculateGamePoints(allCorrectNormal, 3), 1150);
    assert.equal(calculateGamePoints(allCorrectFast, 2), 1600);
    assert.equal(calculateGamePoints(allCorrectSlow, 0), 500);
    assert.equal(calculateGamePoints(allIncorrectNormal, 1), 50);
    assert.equal(calculateGamePoints(allIncorrectFast, 0), 500);
    assert.equal(calculateGamePoints(allIncorrectSlow, 0), -500);
  });
  it(`Should return -1 if answers length is less than 10`, () => {
    assert.equal(calculateGamePoints(notEnoughAnswers, 0), -1);
    assert.equal(calculateGamePoints(emptyAnswers, 0), -1);
    assert.equal(calculateGamePoints(tooManyAnswers, 0), -1);
  });
});

