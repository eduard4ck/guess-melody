import Router from '../main';
import FailView from './fail-view';
import SuccessView from './success-view';
import gameData from '../data/game-data';
import statistics from '../data/game-statistics';
import showBlock from '../utils/show-block';

class ResultPresenter {
  constructor() {
    this.view = this._getView();
  }

  init() {
    this.view.onReplay = this.onReplay;
    showBlock(this.view.element);
  }

  onReplay() {
    Router.showWelcome();
  }

  _getView() {
    if (statistics.now.timer < 1) {
      return new FailView(gameData.levels.failTime);
    }

    if (statistics.now.lives < 1 && statistics.now.questions - statistics.now.currentQuestion !== 0) {
      return new FailView(gameData.levels.failTries);
    }
    return new SuccessView(gameData.levels.resultWin);
  }
}

export default ResultPresenter;


