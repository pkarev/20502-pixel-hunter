import {AbstractView} from "../views/abstract-view";
import {MAX_LIVES} from "./game-utils";
import GoHomeView from "../views/go-home-view";

export default class HeaderView extends AbstractView {
  constructor(model) {
    super();
    this._state = model._state;
    this._timer = model._timer;
    this._goHomeView = new GoHomeView();
    this._header = this.element.querySelector(`.header`);
    this._header.insertBefore(this._goHomeView.element.firstChild, this._header.querySelector(`.game__timer`));
  }

  get template() {
    return `
      <header class="header">
        <div class="game__timer">${this._timer.time}</div>
        <div class="game__lives">
          ${new Array(MAX_LIVES - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
          ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        </div>  
      </header>
    `;
  }
}
