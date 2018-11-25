export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30
});

export const MAX_LIVES = 3;

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
