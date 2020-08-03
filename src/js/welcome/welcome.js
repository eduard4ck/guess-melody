import Router from '../main';
import WelcomeView from './welcome-view';
import showBlock from '../utils/show-block';
import gameData from '../data/game-data';


export default class WelcomePresenter {
  constructor() {
    let screenData = gameData.levels.welcome.clon();
    this.view = new WelcomeView(screenData);
  }

  init() {
    this.view.onPlayClick = this.onPlayClick;
    showBlock(this.view.element);
  }

  onPlayClick() {
    Router.showGame();
  }
}
