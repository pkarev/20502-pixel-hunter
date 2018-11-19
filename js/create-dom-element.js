const createDomElementFromStringTemplate = (string) => {
  const element = document.createElement(`div`);
  element.innerHTML = string;

  return element;
};

export default createDomElementFromStringTemplate;
