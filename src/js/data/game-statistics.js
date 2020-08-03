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

  get POINT() {
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

  countScores() {
    this.now.scores = this.now.statisticAnswers.reduce((acc, el) => {
      acc += el.answer
        ? (el.time < this.POINT.FAST_ANSWER ? this.POINT.MAX_VALUE : this.POINT.MIN_VALUE)
        : this.POINT.MISTAKE_VALUE;
      return acc;
    }, 0);
    this.now.scores = this.now.scores < 0 ? 0 : this.now.scores; // если очков меньше нуля, ставим ноль
    return this.now.scores;
  }

  pushAnswer(answer, time) {
    this.now.statisticAnswers.push({answer, time});
  }

  pushState(state) {
    ({timer: this.now.timer, lives: this.now.lives} = state);
    ({questions: this.now.questions, currentQuestion: this.now.currentQuestion} = state);
  }

  reset() {
    let newStat = this._initialStatistic.clon();
    return Object.assign(this.now, newStat);
  }
}

let statistics = new GameStatistics();
export default statistics;
