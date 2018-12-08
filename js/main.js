import renderScreen from "./render-screen";
import introScreenElement from "./screen-intro";
import {INITIAL_GAME_STATE} from "./game";

export const currentGameState = INITIAL_GAME_STATE;

renderScreen(introScreenElement);
