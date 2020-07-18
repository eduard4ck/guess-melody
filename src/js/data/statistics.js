import {initialState} from './game-state';

export let allPlayersStatistic = [3, 5, 8, 10, 11];

export function countScores(answersArray) {
  if (!answersArray || answersArray.constructor !== Array || answersArray.length < initialState.questions) return -1;
  let scores = answersArray.reduce((acc, el) => {
    acc += el.answer ? (el.time < initialState.fastAnswer ? 2 : 1) : -2;
    return acc;
  }, 0);
  return scores;
}

export function showPlayerResult(ohterRusults, playerResult) {
  if (!ohterRusults || !playerResult) return -1;
  if (playerResult.constructor !== Object) throw new Error(`Second arg isn't an Object`);
  if (playerResult.secondsLeft < 1) return `«Время вышло! Вы не успели отгадать все мелодии»`;
  if (playerResult.lives < 1) return `«У вас закончились все попытки. Ничего, повезёт в следующий раз!»`;

  let sortedArray = ohterRusults.slice();
  sortedArray.push(playerResult.scores);
  sortedArray.sort((left, right) => left - right);

  let sortedSet = Array.from(new Set(sortedArray));

  let index = [...sortedSet].findIndex((el) => el === playerResult.scores);
  return {
    place: sortedSet.length - index,
    players: sortedArray.length,
    percentage: Math.trunc(index / sortedSet.length * 100)
  };
}

