import Welcome from './welcome/welcome';
import Game from './game/game';
import Result from './result/result';
import {Loader} from './abstract';
import Spinner from './common/spinner';
import gameAdapter from './data/game-adapter';


/** @enum {string} */
const Url = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`,
};


class Router {
  constructor() {
    this.spinner = new Spinner(`body`);
    this.spinner.show();

    Loader.loadData(gameAdapter)
      .then((data) => this.data = data)
      .then(() => this.init())
      .catch(() => this.showError())
      .then(() => this.spinner.remove());
  }

  showWelcome() {
    location.hash = Url.WELCOME;
  }

  showGame() {
    location.hash = Url.GAME;
  }

  showResult(statistics) {
    let {timer, scores, lives, date} = statistics.now;
    let dataToSend = {timer, scores, lives, date};

    let spinner = new Spinner(`body`);
    spinner.show();
    Loader.saveResults(dataToSend, gameAdapter)
      .then(() => Loader.loadResults())
      .then((results) => statistics.usersStat = results)
    .then(() => {
      let {mistakes, place, players, percentage} = statistics.now;
      let necessaryData = {timer, scores, mistakes, place, players, percentage};
      let enc = btoa(JSON.stringify(necessaryData));
      location.hash = `${Url.STATS}?=${enc}`;
    })
    .catch(() => this.showError())
    .then(() => spinner.remove());
  }

  showError() {
    let errorBox = document.createElement(`div`);
    errorBox.classList.add(`error-box`);
    errorBox.textContent = `Эй, кажеться произошла ошибка, повтори попытку позже`;
    this.spinner.remove();
    document.body.appendChild(errorBox);
  }

  init() {
    this.changePresenter(this.getIDFromHash(location.hash));
    window.onhashchange = () => this.changePresenter(this.getIDFromHash(location.hash));
  }

  getIDFromHash(hash) {
    return hash.replace(`#`, ``);
  }

  changePresenter(route = ``) {
    let routes = {
      [Url.WELCOME]: new Welcome(),
      [Url.GAME]: new Game(this.data),
    };

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

