import {assert} from 'chai';
import {countScores, showPlayerResult} from './statistics';


describe(`Check counting scores countScores()`, () => {

  it(`should return -1 when the argument isn't array or empty array`, () => {
    assert.equal(-1, countScores());
    assert.equal(-1, countScores(null));
    assert.equal(-1, countScores([]));
    assert.equal(-1, countScores({}));
    assert.equal(-1, countScores(``));
    assert.equal(-1, countScores(NaN));
    assert.equal(-1, countScores(12));
  });

  it(`should return 10 after all right answers`, () => {
    let statisticAnswers = new Array(10).fill(``).map(() => ({answer: true, time: 30}));
    assert.equal(10, countScores(statisticAnswers));
  });

  it(`should return 20 after all right answers with time < 10`, () => {
    let statisticAnswers = new Array(10).fill(``).map(() => ({answer: true, time: 9}));
    assert.equal(20, countScores(statisticAnswers));
  });
});


describe(`Check player statistic result showPlayerResult()`, () => {

  it(`should return place: 2, players: 5, percentage: 60`, () => {
    let allPlayersStatistic = [4, 5, 8, 11];
    let currentGameState = {lives: 3, scores: 10, secondsLeft: 10};
    let wait = {place: 2, players: 5, percentage: 60};
    assert.deepStrictEqual(wait, showPlayerResult(allPlayersStatistic, currentGameState));
  });

  it(`with some same scores in results, should share the place`, () => {
    let allPlayersStatistic = [1, 2, 3, 4, 5, 8, 10, 10, 11];
    let currentGameState = {lives: 3, scores: 10, secondsLeft: 10};
    let wait = {place: 2, players: 10, percentage: 75};
    assert.deepStrictEqual(wait, showPlayerResult(allPlayersStatistic, currentGameState));
  });

  // it(`should return error, if second value is not Object`, () => {
  //   let allPlayersStatistic = [4, 5, 8, 10, 11];
  //   let currentGameState = 7;
  //   assert.throws(showPlayerResult(allPlayersStatistic, currentGameState), `Second arg isn't an Object`);
  // });

  it(`should return -1, when arguments null, NaN or undefined`, () => {
    assert.equal(-1, showPlayerResult());
    assert.equal(-1, showPlayerResult(null, null));
    assert.equal(-1, showPlayerResult(false, false));
    assert.equal(-1, showPlayerResult(``, ``));
    assert.equal(-1, showPlayerResult(NaN, NaN));
    assert.equal(-1, showPlayerResult(12));
  });

});
