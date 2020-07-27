import App from '../main';
import FailtView from './fail-view';
import SuccessView from './success-view';
import gameState from '../data/game-state1';
import gameData from '../data/game-data1';
import statistics from '../data/game-statistics1';
import showBlock from '../utils/show-block';

class Result {
  constructor() {}

  getView() {
    if (gameState.now.lives < 1 && gameState.now.questions - gameState.now.currentQuestion !== 0) {
      let screenData = gameData.levels.failTries;
      return new FailtView(screenData);
    }
    let screenData = Object.assign({}, gameData.levels.resultWin, statistics.getStat());
    return new SuccessView(screenData);
  }

  init() {
    this.view = this.getView();
    this.view.onReplay = this.onReplay;
    showBlock(this.view.element);
  }

  onReplay() {
    App.showWelcome();
  }
}

let result = new Result();
export default result;

