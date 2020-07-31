import Router from '../main';
import FailView from './fail-view';
import SuccessView from './success-view';
import welcome from '../welcome/welcome';
import gameState from '../data/game-state';
import gameData from '../data/game-data';
import statistics from '../data/game-statistics';
import showBlock from '../utils/show-block';

class ResultPresenter {
  constructor() {
    this.view = this._getView();
  }

  init() {
    if (welcome.view.timer.view.intervalId !== false) welcome.view.timer.clearTimer();
    this.view.onReplay = this.onReplay;
    showBlock(this.view.element);
  }

  onReplay() {
    Router.showWelcome();
  }

  _getView() {
    if (gameState.now.timer < 1) {
      let screenData = gameData.levels.failTime;
      return new FailView(screenData);
    }

    if (gameState.now.lives < 1 && gameState.now.questions - gameState.now.currentQuestion !== 0) {
      let screenData = gameData.levels.failTries;
      return new FailView(screenData);
    }
    let screenData = Object.assign({}, gameData.levels.resultWin, statistics.getStat());
    return new SuccessView(screenData);
  }
}

export default ResultPresenter;


