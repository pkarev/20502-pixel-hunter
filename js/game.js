export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30
});

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
