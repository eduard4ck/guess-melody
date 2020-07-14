import {assert} from 'chai';
import gameState, {initialState} from './game-state';

describe(`Check frozen keys of {initialState}`, () => {

  it(`should return epty array in "statisticAnswers", if gameState reseted`, () => {
    gameState.reset();
    gameState.now.mistakes = 5;
    gameState.now.lives = 55;
    gameState.now.someNewKey = `keykey`;
    gameState.now.statisticAnswers.push({answer: true, time: 22});
    gameState.now.statisticAnswers.push({answer: false, time: 31});
    assert.deepStrictEqual(initialState, gameState.reset());
  });
});
