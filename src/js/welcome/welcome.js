import WelcomeView from './welcome-view';
import App from '../main';
import showBlock from '../utils/show-block';
import gameData from '../data/game-data1';
import gameState from '../data/game-state1';
import statistics from '../data/game-statistics1';


class Welcome {
  constructor() {}

  duplicate(object) {
    return JSON.parse(JSON.stringify(object));
  }

  init() {
    gameState.reset();
    statistics.reset();
    let screenData = this.duplicate(gameData.levels.welcome);
    this.view = new WelcomeView(screenData);
    this.view.onPlayClick = () => App.showGame();
    showBlock(this.view.element);
  }
}

let welcome = new Welcome();
export default welcome;
