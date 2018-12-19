import {AbstractView} from "../utils/abstract-view";
import {MAX_LIVES, TIME_START_BLINKING} from "../utils/game";
import GoHomeView from "./go-home-view";

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
        <div class="game__timer${this.getTimerClass(this._timer.time)}">${this._timer.time}</div>
        <div class="game__lives">
          ${new Array(MAX_LIVES - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
          ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        </div>  
      </header>
    `;
  }

  getTimerClass(time) {
    return time === TIME_START_BLINKING ? ` game__timer--blinking` : ``;
  }
}
