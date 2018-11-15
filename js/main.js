'use strict';

const templatesNodeList = document.querySelectorAll(`template`);
const screenIds = [];
const screens = [];
const main = document.querySelector(`#main`);

const KeyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

const screenControlsTemplate = `<div class="arrows__wrap">
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

let currentScreenIndex = 0;

const getScreenIds = () => {
  templatesNodeList.forEach((node) => {
    screenIds.push(node.id);
  });
};

const getScreenTemplates = () => {
  screenIds.forEach((id) => {
    const screen = document.querySelector(`#` + id + ``);
    screens.push(screen);
  });
};

const renderScreen = (screenIndex) => {
  const shadow = document.createElement(`div`);
  const content = screens[screenIndex].content.cloneNode(true);
  shadow.appendChild(content);
  const screenContent = shadow.cloneNode(true);
  main.innerHTML = ``;
  main.appendChild(screenContent);
  currentScreenIndex = (screenIndex);
};

const isLeftArrowKeyup = (evt, action) => {
  if (evt.keyCode !== KeyCode.LEFT_ARROW) {
    return;
  }
  action();
};

const isRightArrowKeyup = (evt, action) => {
  if (evt.keyCode !== KeyCode.RIGHT_ARROW) {
    return;
  }
  action();
};

const renderPreviousScreen = () => {
  if (currentScreenIndex === 0) {
    return;
  }
  currentScreenIndex--;
  renderScreen(currentScreenIndex);
};

const renderNextScreen = () => {
  if (currentScreenIndex === screens.length - 1) {
    return;
  }
  currentScreenIndex++;
  renderScreen(currentScreenIndex);
};

const onDocumentArrowKeyUp = (evt) => {
  evt.preventDefault();
  isLeftArrowKeyup(evt, renderPreviousScreen);
  isRightArrowKeyup(evt, renderNextScreen);
};

const addScreenSwitcher = () => {
  const screenControls = document.createElement(`div`);
  screenControls.innerHTML = screenControlsTemplate;
  document.body.appendChild(screenControls);
  const controlPrev = document.querySelector(`.arrows__btn--prev`);
  const controlNext = document.querySelector(`.arrows__btn--next`);
  controlPrev.addEventListener(`click`, onScreenPrevClick);
  controlNext.addEventListener(`click`, onScreenNextClick);
};

const onScreenPrevClick = (evt) => {
  evt.preventDefault();
  renderPreviousScreen();
};

const onScreenNextClick = (evt) => {
  evt.preventDefault();
  renderNextScreen();
};

getScreenIds();
getScreenTemplates();
renderScreen(1);

document.addEventListener(`keyup`, onDocumentArrowKeyUp);

addScreenSwitcher();
