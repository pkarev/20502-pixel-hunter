import GameModel from "./game-model";
import HeaderView from "./game-header-view";
import LevelView from "./game-level-view";

const gameModel = new GameModel();

export default class GameScreen {
  constructor() {
    this.model = gameModel;
    this.header = new HeaderView(this.model.state);
    this.level = new LevelView(this.model);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.level.element);
  }

  get element() {
    return this.root;
  }

  updateGameView() {
    this.changeHeader();
    this.changeLevel();
  }

  changeHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeLevel() {
    const level = new LevelView(this.model);
    level.onAnswer = this.answer.bind(this);

    this.root.replaceChild(level.element, this.level.element);
    this.level = level;
  }

  startGame() {
    this.updateGameView();
  }

  answer() {}
}
