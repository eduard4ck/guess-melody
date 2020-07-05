import showBlock from '../utils/show-block';
import gameState from "../data/game-state";
import data, {levelToRender} from "../data/data";
import songsData from "../data/songs-data";
import getRandomItem from '../utils/get-random-item';

export function renderState() {
  let {screen} = gameState.now;
  let module = levelToRender.get(screen);
  let dataWithSongs = getSongs(data[screen]);

  /* Первому модулю отправляем песни + уникальную, второму песни. Остальным без песен, просто шаблон модуля  */
  switch (screen) {
    case `levelArtist`: showBlock(module(dataWithSongs, getUniqueSong(dataWithSongs))); break;
    case `levelGenre`: showBlock(module(dataWithSongs)); break;
    default: showBlock(module(data[screen])); break;
  }
}

function getSongs(levelData, allSongs = songsData) { // выборка уникальных песен из data.js
  if (!(`answers` in levelData)) return;

  let songs = levelData.answers;
  let someSongs = new Set();

  while (someSongs.size < songs.length) {
    someSongs.add(getRandomItem(allSongs));
  }

  levelData = Object.assign({}, levelData);
  levelData.answers = Object.assign([], songs, [...someSongs]);
  return levelData;
}

function getUniqueSong({answers: songs}) {
  if (!songs) return;
  return getRandomItem(songs);
}
