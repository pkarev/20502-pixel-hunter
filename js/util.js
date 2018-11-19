const KeyCode = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

export const isLeftArrowKeyup = (evt, action) => {
  if (evt.keyCode !== KeyCode.LEFT_ARROW) {
    return;
  }
  action();
};

export const isRightArrowKeyup = (evt, action) => {
  if (evt.keyCode !== KeyCode.RIGHT_ARROW) {
    return;
  }
  action();
};

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

export {debounce, validateFields};
