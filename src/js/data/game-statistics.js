import gameState from './game-state';
import declension from '../utils/word-declension';

class GameStatistics {
  constructor() {
    this._initialStatistic = Object.freeze({
      mistakes: 0,
      scores: 0,
      place: 0,
      percentage: 0,
      statisticAnswers: [],
    });
    this.allPlayersStatistic = [3, 5, 8, 9, 11];
    this._stat = {};
  }

  get POINTS() {
    return {
      FAST_ANSWER: 10, // sec
      MAX_VALUE: 2,
      MIN_VALUE: 1,
      MISTAKE_VALUE: -2
    };
  }

  get now() {
    return this._stat;
  }

  getStat() {
    let sortedArray = this.allPlayersStatistic.slice();
    sortedArray.push(this.countScores());
    sortedArray.sort((left, right) => left - right);

    let sortedSet = Array.from(new Set(sortedArray));
    let index = [...sortedSet].findIndex((el) => el === this.now.scores);

    let timePassed = gameState.initialState.timer - gameState.now.timer;
    this.now.place = sortedSet.length - index;
    this.now.players = sortedArray.length;
    this.now.percentage = Math.trunc(index / sortedSet.length * 100);
    this.now.mistakes = gameState.initialState.lives - gameState.now.lives;
    this.now.minNumber = Math.trunc((timePassed) / 60);
    this.now.secNumber = (timePassed) % 60;
    this.now.minText = declension(this.now.minNumber, [`минуту`, `минуты`, `минут`]);
    this.now.secText = declension((timePassed) % 60, [`секунду`, `секунды`, `секунд`]);
    this.now.ball = declension(this.now.scores, [`балл`, `балла`, `баллов`]);
    this.now.oshibok = declension(this.now.mistakes, [`ошибку`, `ошибки`, `ошибок`]);
    return this.now;
  }

  countScores() {
    this.now.scores = this.now.statisticAnswers.reduce((acc, el) => {
      acc += el.answer
        ? (el.time < this.POINTS.FAST_ANSWER ? this.POINTS.MAX_VALUE : this.POINTS.MIN_VALUE)
        : this.POINTS.MISTAKE_VALUE;
      return acc;
    }, 0);
    this.now.scores = this.now.scores < 0 ? 0 : this.now.scores; // если очков меньше нуля, ставим ноль
    return this.now.scores;
  }

  pushAnswer(answer, time) {
    this.now.statisticAnswers.push({answer, time});
  }

  reset() {
    let newStat = this._initialStatistic.clon();
    return Object.assign(this.now, newStat);
  }
}

let statistics = new GameStatistics();
export default statistics;
