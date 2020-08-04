import {initialState} from './game-data';

class GameStatistics {
  constructor() {
    this._initialStatistic = Object.freeze({
      mistakes: 0,
      scores: 0,
      place: 0,
      percentage: 0,
      statisticAnswers: [],
    });
    this._POINT = {
      FAST_ANSWER: 10, // sec
      MAX_VALUE: 2,
      MIN_VALUE: 1,
      MISTAKE_VALUE: -2
    };
    this._stat = {};
    this.allPlayersStatistic = [3, 5, 8, 9, 11];
  }

  get now() {
    return this._stat;
  }

  pushAnswer(answer, time) {
    this.now.statisticAnswers.push({answer, time});
  }

  pushState(state) {
    ({timer: this.now.timer, lives: this.now.lives} = state);
    ({questions: this.now.questions, currentQuestion: this.now.currentQuestion} = state);
    this._countStats();
  }

  reset() {
    let newStat = this._initialStatistic.clon();
    return Object.assign(this.now, newStat);
  }

  _countStats() {
    let s = this._stat;

    let sortedArray = this.allPlayersStatistic.slice();
    sortedArray.push(this._countScores());
    sortedArray.sort((left, right) => left - right);

    let sortedSet = Array.from(new Set(sortedArray));
    let index = [...sortedSet].findIndex((el) => el === s.scores);

    s.mistakes = initialState.lives - s.lives;
    s.place = sortedSet.length - index;
    s.players = sortedArray.length;
    s.percentage = Math.trunc(index / sortedSet.length * 100);
  }

  _countScores() {
    this.now.scores = this.now.statisticAnswers.reduce((acc, el) => {
      acc += el.answer
        ? (el.time < this._POINT.FAST_ANSWER ? this._POINT.MAX_VALUE : this._POINT.MIN_VALUE)
        : this._POINT.MISTAKE_VALUE;
      return acc;
    }, 0);
    this.now.scores = this.now.scores < 0 ? 0 : this.now.scores; // если очков меньше нуля, ставим ноль
    return this.now.scores;
  }
}

let statistics = new GameStatistics();
export default statistics;
