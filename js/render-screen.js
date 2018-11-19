const main = document.querySelector(`#main`);

const renderScreen = (contentElement) => {
  main.innerHTML = ``;
  main.appendChild(contentElement);
};

export default renderScreen;
