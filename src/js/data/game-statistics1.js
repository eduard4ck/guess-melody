import gameState from './game-state1';
import declension from '../utils/word-declension';

class GameStatistics {
  constructor() {
    this._initialStatistic = {
      mistakes: 0,
      scores: 0,
      place: 0,
      percentage: 0,
      statisticAnswers: [],
    };
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
    let index = [...sortedSet].findIndex((el) => el === this._stat.scores);

    let timePassed = 105; // gameState.initialState.timer - gameState.now.timer
    this._stat.place = sortedSet.length - index;
    this._stat.players = sortedArray.length;
    this._stat.percentage = Math.trunc(index / sortedSet.length * 100);
    this._stat.mistakes = gameState.initialState.lives - gameState.now.lives;
    this._stat.minNumber = Math.trunc((timePassed) / 60);
    this._stat.secNumber = (timePassed) % 60;
    this._stat.minText = declension(this._stat.minNumber, [`минуту`, `минуты`, `минут`]);
    this._stat.secText = declension((timePassed) % 60, [`секунду`, `секунды`, `секунд`]);
    this._stat.ball = declension(this._stat.scores, [`балл`, `балла`, `баллов`]);
    this._stat.oshibok = declension(this._stat.mistakes, [`ошибку`, `ошибки`, `ошибок`]);
    return this._stat;
  }

  countScores() {
    this._stat.scores = this._stat.statisticAnswers.reduce((acc, el) => {
      acc += el.answer
        ? (el.time < this.POINTS.FAST_ANSWER ? this.POINTS.MAX_VALUE : this.POINTS.MIN_VALUE)
        : this.POINTS.MISTAKE_VALUE;
      return acc;
    }, 0);
    this._stat.scores = this._stat.scores < 0 ? 0 : this._stat.scores; // если очков меньше нуля, ставим ноль
    return this._stat.scores;
  }

  pushAnswer(answer, time) {
    this._stat.statisticAnswers.push({answer, time});
  }

  reset() {
    let newStat = JSON.parse(JSON.stringify(this._initialStatistic));
    return Object.assign(this._stat, newStat);
  }
}

let statistics = new GameStatistics();
export default statistics;
