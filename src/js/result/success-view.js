import View from '../view';
import logo from '../common/logo';
import statistics from '../data/game-statistics';
import {initialState} from '../data/game-data';
import declension from '../utils/word-declension';

export default class SuccessView extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.getStatisticData();
  }

  get template() {
    return `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${this.title}</h2>
      <div class="main-stat">За&nbsp;${this.minNumber}&nbsp;${this.minText} и ${this.secNumber}&nbsp;${this.secText}
        <br>вы&nbsp;набрали ${this.scores} ${this.ball}
        <br>совершив ${this.mistakes} ${this.oshibok}</div>
      <span class="main-comparison">Вы заняли ${this.place} место из ${this.players}. 
        Это&nbsp;лучше чем у&nbsp;${this.percentage}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  getStatisticData() {
    let sortedArray = statistics.allPlayersStatistic.slice();
    sortedArray.push(statistics.countScores());
    sortedArray.sort((left, right) => left - right);

    let sortedSet = Array.from(new Set(sortedArray));
    let index = [...sortedSet].findIndex((el) => el === statistics.now.scores);

    let timePassed = initialState.timer - statistics.now.timer;
    this.scores = statistics.now.scores;
    this.mistakes = initialState.lives - statistics.now.lives;
    this.place = sortedSet.length - index;
    this.players = sortedArray.length;
    this.percentage = Math.trunc(index / sortedSet.length * 100);
    this.minNumber = Math.trunc((timePassed) / 60);
    this.secNumber = (timePassed) % 60;
    this.minText = declension(this.minNumber, [`минуту`, `минуты`, `минут`]);
    this.secText = declension((timePassed) % 60, [`секунду`, `секунды`, `секунд`]);
    this.ball = declension(this.scores, [`балл`, `балла`, `баллов`]);
    this.oshibok = declension(this.mistakes, [`ошибку`, `ошибки`, `ошибок`]);
  }

  bind() {
    this.logotype = this.element.querySelector(`.logo`);
    this.retryText = this.element.querySelector(`.main-replay`);
    this.logotype.addEventListener(`click`, this.onReplay);
    this.retryText.addEventListener(`click`, this.onReplay);
  }

  onReplay() {}
}
