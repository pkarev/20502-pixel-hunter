import GameModel from "./game-model";
import HeaderView from "./game-header-view";
import LevelView from "./game-level-view";

const ONE_SECOND = 1000;
const gameModel = new GameModel();

export default class GameScreen {
  constructor() {
    this.model = gameModel;
    this.header = new HeaderView(this.model);
    this.level = new LevelView(this.model);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.level.element);

    this._timer = null;
  }

  get element() {
    return this.root;
  }

  _tick() {
    this.model._timer.tick();
    this.updateTime();

    if (this.model._timer.time) {
      this._timer = setTimeout(() => this._tick(), ONE_SECOND);
    } else {
      console.log(`time is over`);
    }
  }

  updateGameView() {
    this.updateHeader();
    this.updateLevel();
  }

  updateHeader() {
    const header = new HeaderView(this.model);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  updateLevel() {
    const level = new LevelView(this.model);
    level.onAnswer = this.answer.bind(this);

    this.root.replaceChild(level.element, this.level.element);
    this.level = level;
  }

  updateTime() {
    this.header.element.querySelector(`.game__timer`).textContent = this.model._timer.time;
  }

  startGame() {
    this.updateGameView();

    this._timer = setTimeout(() => this._tick(), ONE_SECOND);
  }

  answer() {}
}
