import showBlock from '../utils/show-block';
import gameState, {initialState} from "../data/game-state";
import levels, {levelToRender, randomFrom2Screens} from "../data/data";
import songsData, {questions} from "../data/songs-data";
import getRandomItem, {getRandomInt} from '../utils/get-random-item';
import {countScores, showPlayerResult, allPlayersStatistic} from "../data/statistics";


export function renderState() { // Формируем игровой модуль (screen)
  let {screen} = gameState.now;
  let module = levelToRender.get(screen);

  /* Первому модулю отправляем песни + уникальную, второму песни. Остальным без песен, просто шаблон модуля  */
  switch (screen) {
    case `levelArtist`:
      let question = nextQuestion(screen);
      let dataWithSongs = getSongs(levels[screen]);
      dataWithSongs.title = question;
      showBlock(module(dataWithSongs, getUniqueSong(dataWithSongs)));
      break;

    case `levelGenre`:
      let quest = nextQuestion(screen);
      let dataWithS = getSongs(levels[screen], songsData, quest);
      dataWithS.title = quest[0];
      showBlock(module(dataWithS));
      break;

    case `resultWin`:
      let dataWithStatistic = getStatistic(levels[screen]);
      showBlock(module(dataWithStatistic));
      break;

    default:
      showBlock(module(levels[screen]));
      gameState.reset();
      break;
  }
  if (screen === `levelGenre` || screen === `levelArtist`) gameState.now.currentQuestion++;
}

export function nextScreen() {
  let state = gameState.now;
  if (state.lives < 1 && state.questions - state.currentQuestion !== 0) {
    return `failTries`;
  } else if (state.currentQuestion < state.questions) {
    return randomFrom2Screens();
  } else {
    return `resultWin`;
  }
}


export function isValidAnswer(module, ...others) {
  if (module === `levelArtist`) {
    let [trueSongId, answerId] = others;
    if (answerId.endsWith(trueSongId)) return true;
  }

  if (module === `levelGenre`) {
    let [levelData, checkedSongs] = others;
    let genre = questions.get(levelData.title);
    let levelSongs = levelData.answers;

    let genredSongs = levelSongs.filter((song) => song.genre === genre);
    let selectedSongs = levelSongs.filter((song) => checkedSongs.some((it) => it.value.endsWith(song.value)));
    if (genredSongs.length !== selectedSongs.length) return false;

    let isAllSongsTrue = genredSongs.every((genredS) => selectedSongs.some((selectedS) => selectedS === genredS));
    return isAllSongsTrue;
  }
  return false;
}

export function getSongs(levelData, allSongs = songsData, question) { // выборка уникальных песен из всех
  if (!(`answers` in levelData)) return;

  let songs = levelData.answers;
  let someSongs = new Set();

  while (someSongs.size < songs.length) {
    someSongs.add(getRandomItem(allSongs));
  }

  if (question) {
    let isGenreTrue = [...someSongs].some((song) => song.genre === question[1]);

    if (!isGenreTrue) { // если в список не попала песня нужного жанра, добавляем
      let genreSongs = allSongs.filter((song) => song.genre === question[1]);
      let randomSong = getRandomItem(genreSongs);
      someSongs = [...someSongs];
      someSongs.splice(getRandomInt(someSongs.length - 1), 1, randomSong);
    }
  }

  levelData = Object.assign({}, levelData);
  levelData.answers = Object.assign([], songs, [...someSongs]);
  return levelData;
}

function getStatistic(levelData) {
  let state = gameState.now;
  let playerScores = {scores: countScores(state.statisticAnswers)};
  playerScores.scores = playerScores.scores < 0 ? 0 : playerScores.scores; // если очков меньше нуля, ставим ноль
  let statForScreen = showPlayerResult(allPlayersStatistic, playerScores);

  levelData = Object.assign({}, levelData, state, playerScores, statForScreen);
  levelData.mistakes = initialState.lives - state.lives;
  delete levelData.statisticAnswers;

  return levelData;
}


function getUniqueSong({answers: songs}) {
  if (!songs) return;
  return getRandomItem(songs);
}

export function nextQuestion(screen) {
  if (screen === `levelArtist`) return `Кто исполняет эту песню?`;
  if (screen === `levelGenre`) return getRandomItem([...questions]);
}

