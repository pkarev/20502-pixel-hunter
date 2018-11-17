import renderScreen from "./render-screen";
import introScreenElement from "./screen-intro";

const debounce = (fun, debounceInterval) => {
  let lastTimeout = null;

  return function (...args) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      fun(...args);
    }, debounceInterval);
  };
};

const onGoHomeClick = () => {
  renderScreen(introScreenElement);
};

export {debounce, onGoHomeClick};
