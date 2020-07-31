import welcome from './welcome/welcome';
import Game from './game/game';
import Result from './result/result';

class Router {
  constructor() {}

  static showWelcome() {
    welcome.init();
  }

  static showGame() {
    new Game().init();
  }

  static showResult() {
    new Result().init();
  }

  static init() {
    this.showWelcome();
  }
}

Router.init();

export default Router;

