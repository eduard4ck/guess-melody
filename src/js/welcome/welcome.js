import WelcomeView from './welcome-view';
import Router from '../main';
import Timer from '../common/timer';
import showBlock from '../utils/show-block';
import gameData from '../data/game-data';
import gameState from '../data/game-state';
import statistics from '../data/game-statistics';


class WelcomePresenter {
  constructor() {
    let screenData = gameData.levels.welcome.clon();
    this.view = new WelcomeView(screenData);
  }

  init() {
    gameState.reset();
    statistics.reset();
    this.view.onPlayClick = this.onPlayClick;
    showBlock(this.view.element);
  }

  onPlayClick() {
    Router.showGame();
    this.timer = new Timer();
    this.timer.init();
  }
}

let welcome = new WelcomePresenter();
export default welcome;
