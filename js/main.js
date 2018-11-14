'use strict';

const templatesNodeList = document.querySelectorAll(`template`);
const screenIds = [];
const screens = [];
const main = document.querySelector(`#main`);

const KeyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

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

getScreenIds();
getScreenTemplates();
renderScreen(1);

document.addEventListener(`keyup`, onDocumentArrowKeyUp);
