import {assert} from 'chai';
import statistics from '../js/data/game-statistics';

describe(`Check frozen keys of {initialState}`, () => {

  it(`should return empty array in "statisticAnswers", if statistic reseted`, () => {
    statistics.reset();
    assert.deepStrictEqual([], statistics._initialStatistic.statisticAnswers);
  });
});

// describe(`Check frozen keys of {initialState}`, () => {

//   it(`should return empty array in "statisticAnswers", if gameState reseted`, () => {
//     gameState.reset();
//     gameState.now.mistakes = 5;
//     gameState.now.lives = 55;
//     gameState.now.someNewKey = `keykey`;
//     gameState.now.statisticAnswers.push({answer: true, time: 22});
//     gameState.now.statisticAnswers.push({answer: false, time: 31});
//     assert.deepStrictEqual(initialState, gameState.reset());
//   });
// });