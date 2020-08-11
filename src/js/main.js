import Model from './model';
import Welcome from './welcome/welcome';
import Game from './game/game';
import Result from './result/result';
import Preloader from './common/preloader';
import gameAdapter from './data/game-adapter';


/** @enum {string} */
const Url = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`,
};


class Router {
  constructor() {
    this.preloader = new Preloader(`body`);
    this.preloader.show();

    this.model = new class extends Model {
      get urlRead() {
        return `https://my-json-server.typicode.com/eduard4ck/gue/questions`;
      }

      get urlWrite() {
        return `http://intensive-ecmascript-server-srmhvdwcks.now.sh/stats/oO`;
      }
    }();

    this.model.load(gameAdapter)
      .then((data) => this.init(data))
      .then(() => this.preloader.remove())
      .catch(console.error);
  }

  showWelcome() {
    location.hash = Url.WELCOME;
  }

  showGame() {
    location.hash = Url.GAME;
  }

  showResult({timer, scores, mistakes, place, players, percentage}) {
    let necessary = {timer, scores, mistakes, place, players, percentage};
    let enc = btoa(JSON.stringify(necessary));
    location.hash = `${Url.STATS}?=${enc}`;
  }

  init(data) {
    this.changePresenter(this.getIDFromHash(location.hash), data);
    window.onhashchange = () => this.changePresenter(this.getIDFromHash(location.hash), data);
  }

  getIDFromHash(hash) {
    return hash.replace(`#`, ``);
  }

  changePresenter(route = ``, data) {
    let routes = {
      [Url.WELCOME]: new Welcome(),
      [Url.GAME]: new Game(data),
    };
    console.log(route);
    console.log(data);

    if (typeof routes[route] === `undefined`) {
      let enc = route.split(`stats?=`);
      if (enc.length === 2) {
        let dec = JSON.parse(atob(enc[1]));
        return new Result(dec).init();
      }
      route = ``;
    }

    return routes[route].init();
  }
}

let router = new Router();
export default router;

