'use strict';

const templatesNodeList = document.querySelectorAll(`template`);
const screenIds = [];
const screens = [];

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

getScreenIds();
getScreenTemplates();
