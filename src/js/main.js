import Welcome from './welcome/welcome';
import Game from './game/game';
import Result from './result/result';


/** @enum {string} */
const Url = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`,
};


export default class Router {
  constructor() {}

  static showWelcome() {
    location.hash = Url.WELCOME;
  }

  static showGame() {
    location.hash = Url.GAME;
  }

  static showResult({timer, scores, mistakes, place, players, percentage}) {
    let necessary = {timer, scores, mistakes, place, players, percentage};
    let enc = btoa(JSON.stringify(necessary));
    location.hash = `${Url.STATS}?=${enc}`;
  }

  static init() {
    this.changeController(this.getIDFromHash(location.hash));
    window.onhashchange = () => this.changeController(this.getIDFromHash(location.hash));
  }

  static getIDFromHash(hash) {
    return hash.replace(`#`, ``);
  }

  static changeController(route = ``) {
    let routes = {
      [Url.WELCOME]: Welcome,
      [Url.GAME]: Game,
    };

    if (typeof routes[route] === `undefined`) {
      let enc = route.split(`stats?=`);
      if (enc.length === 2) {
        let dec = JSON.parse(atob(enc[1]));
        return new Result(dec).init();
      }
      route = ``;
    }

    let Controller = routes[route];
    new Controller().init();
  }
}

Router.init();
