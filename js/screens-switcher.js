import createDomElementFromStringTemplate from "./create-dom-element";
import renderScreen from "./render-screen";
import introScreenElement from "./screen-intro";
import rulesScreenElement from "./screen-rules";
import greetingScreenElement from "./screen-greeting";
import gameTwoImageScreenElement from "./screen-game-two-images";
import gameOneImageScreenElement from "./screen-game-one-image";
import gameThreeImageScreenElement from "./screen-game-three-images";
import statsScreenElement from "./screen-stats";
import {isLeftArrowKeyup, isRightArrowKeyup} from "./util";

const screenControlsTemplate = `
<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn arrows__btn--prev"><-</button>
  <button class="arrows__btn arrows__btn--next">-></button>
</div>
`;

const screenControlsElement = createDomElementFromStringTemplate(screenControlsTemplate);
const controlPrev = screenControlsElement.querySelector(`.arrows__btn--prev`);
const controlNext = screenControlsElement.querySelector(`.arrows__btn--next`);

export const screens = [
  introScreenElement,
  greetingScreenElement,
  rulesScreenElement,
  gameScreenElement,
  statsScreenElement
];

const renderPreviousScreen = () => {
  if (currentScreenIndex === 0) {
    return;
  }
  currentScreenIndex--;
  renderScreen(screens[currentScreenIndex]);
};

const renderNextScreen = () => {
  if (currentScreenIndex === screens.length - 1) {
    return;
  }
  currentScreenIndex++;
  renderScreen(screens[currentScreenIndex]);
};

const onScreenPrevClick = (evt) => {
  evt.preventDefault();
  renderPreviousScreen();
};

const onScreenNextClick = (evt) => {
  evt.preventDefault();
  renderNextScreen();
};

let currentScreenIndex = 0;

controlPrev.addEventListener(`click`, onScreenPrevClick);
controlNext.addEventListener(`click`, onScreenNextClick);

export const addScreenSwitchingButtons = () => {
  document.body.appendChild(screenControlsElement);
};

const onDocumentArrowKeyUp = (evt) => {
  evt.preventDefault();
  isLeftArrowKeyup(evt, renderPreviousScreen);
  isRightArrowKeyup(evt, renderNextScreen);
};

export const activateKeyboardScreenSwitching = () => {
  document.addEventListener(`keyup`, onDocumentArrowKeyUp);
};
