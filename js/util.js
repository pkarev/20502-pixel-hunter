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

const validateFields = (formFields) => {
  let isAllFieldsValid = true;
  formFields.forEach((formField) => {
    isAllFieldsValid = formField.checkValidity() ? isAllFieldsValid : formField.checkValidity();
  });

  return isAllFieldsValid;
};

const onGoHomeClick = () => {
  renderScreen(introScreenElement);
};

export {debounce, validateFields, onGoHomeClick};
