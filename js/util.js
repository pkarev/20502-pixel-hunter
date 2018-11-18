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
