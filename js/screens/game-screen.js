import HeaderView from "../views/game-header-view";
import LevelView from "../views/game-level-view";
import Application from "../application";
import {ONE_SECOND, TIME_START_BLINKING} from "../utils/game";

export default class GameScreen {
  constructor(gameModel) {
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

    if (this.model._timer.time === TIME_START_BLINKING) {
      this.updateHeader();
    } else {
      this.updateTime();
    }

    if (this.model._timer.time) {
      this._timer = setTimeout(() => this._tick(), ONE_SECOND);
    } else {
      this.answer(undefined);
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

  stopGame() {
    clearTimeout(this._timer);
  }

  answer(isCorrect) {
    this.stopGame();

    this.model.addNewAnswer(isCorrect);

    if (!isCorrect) {
      if (this.model.lives) {
        this.model.reduceLives();
      } else {
        this.model.loose();
        Application.showScores(this.model);
      }
    }

    if (!this.model.hasNextLevel) {
      Application.showScores(this.model);
      return;
    }

    this.model.nextLevel();
    this.model._timer.reset();
    this.startGame();
  }
}
