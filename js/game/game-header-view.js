import {AbstractView} from "../views/abstract-view";
import {MAX_LIVES} from "./game-utils";

export default class HeaderView extends AbstractView {
  constructor(model) {
    super();
    this._state = model._state;
    this._timer = model._timer;
  }

  get template() {
    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        <div class="game__timer">${this._timer.time}</div>
        <div class="game__lives">
          ${new Array(MAX_LIVES - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
          ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        </div>  
      </header>
    `;
  }

  bind() {
    const goHome = this.element.querySelector(`.back`);

    goHome.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.onGoHomeClick();
    });
  }

  onGoHomeClick() {}
}
