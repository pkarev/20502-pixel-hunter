import AbstractView from "../utils/abstract-view";

export default class DataLoadErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <div class="data-load-error">
        <h2 class="data-load-error__title">Произошла ошибка загрузки данных игры</h2>
        <p class="data-load-error__code">Код ошибки: ${this.error.message}</p>
        <p class="data-load-error__message">Попробуйте запусить игру позже</p>
      </div>
    `;
  }
}
