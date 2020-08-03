import Welcome from './welcome/welcome';
import Game from './game/game';
import Result from './result/result';


/** @enum {string} */
// const Url = {
//   WELCOME: ``,
//   GAME: `game`,
//   FAIL: `fail`,
//   STATS: `stats`
// };

// const getUrlFromHash = (hash) => hash.replace(`#`, ``);

// class Router {
//   constructor() {
//     this.routes = {
//       [Url.WELCOME]: welcome,
//       [Url.GAME]: Game,
//       [Url.FAIL]: Result,
//       [Url.STATISTIC]: Result,
//     };

//     window.onhashchange = () => {
//       this.changeController(getUrlFromHash(location.hash));
//     };
//   }

//   changeController(route = ``) {
//     let Controller = this.routes[route];
//     new Controller.init();
//   }

//   static showWelcome() {
//     // location.hash = Url.WELCOME;
//     let welcome = new WelcomePresenter();
//     showBlock(welcome.element);
//   }

//   static showGame() {
//     let game = new GamePresenter(new GameModel(gameState, statistics));
//     showBlock(game.element);
//     game.init();
//   }

//   static showResult() {
//     let result = new ResultPresenter();
//     showBlock(result.element);
//   }

//   static init() {
//     this.showWelcome();
//   }
// }

// const app = new Router();
// app.init();
// export default app;


class Router {
  constructor() {}

  static showWelcome() {
    new Welcome().init();
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

