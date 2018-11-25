import {assert} from 'chai';
import {changeLevel, changeLives, INITIAL_GAME_STATE} from '../game';

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
