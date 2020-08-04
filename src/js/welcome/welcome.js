import Router from '../main';
import WelcomeView from './welcome-view';
import gameData from '../data/game-data';
import {showBlock} from '../utils';


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
