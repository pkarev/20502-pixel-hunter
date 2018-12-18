import {assert} from 'chai';
import Timer from "../utils/game";
import {
  INITIAL_GAME_STATE,
  calculateGamePoints,
  changeLevel,
  changeLives,
} from '../utils/game';

const TEST_ANSWERS = {
  ALL_CORRECT: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`],
  ALL_FAST: [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`],
  ALL_SLOW: [`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`],
  ALL_WRONG: [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`],
};

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
    assert.equal(calculateGamePoints(TEST_ANSWERS.ALL_CORRECT, 3), 1150);
    assert.equal(calculateGamePoints(TEST_ANSWERS.ALL_FAST, 2), 1600);
    assert.equal(calculateGamePoints(TEST_ANSWERS.ALL_SLOW, 0), 500);
    assert.equal(calculateGamePoints(TEST_ANSWERS.ALL_WRONG, 1), 50);
  });
  it(`Should return -1 if answers length is less than 10`, () => {
    assert.equal(calculateGamePoints(new Array(5), 0), -1);
    assert.equal(calculateGamePoints(new Array(13), 0), -1);
  });
});

