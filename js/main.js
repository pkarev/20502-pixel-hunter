'use strict';

const templatesNodeList = document.querySelectorAll(`template`);
const screenIds = [];
const screens = [];
const main = document.querySelector(`#main`);

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

getScreenIds();
getScreenTemplates();
