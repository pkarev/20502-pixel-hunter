import {assert} from 'chai';
import {changeLevel, INITIAL_GAME_STATE} from '../game';

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
