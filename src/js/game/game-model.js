import gameData, {initialState} from '../data/game-data';
import songsData from '../data/songs-data';
import {getRandomItem, getRandomInt} from '../utils';

export default class GameModel {
  constructor() {
    this._state = {};
    this.reset();
  }

  get state() {
    return this._state;
  }

  nextQuestion() {
    return ++this.state.currentQuestion;
  }

  tick() {
    return --this.state.timer;
  }

  setLives(answer) {
    answer === false ? this.state.lives-- : void 0;
    return this.state.lives;
  }

  reset() {
    return Object.assign(this.state, initialState.clon());
  }

  getSomeScreen1(ScreenView, data) {
    data.lives = this.state.lives;
    return new ScreenView(data);
  }

  // getSomeScreen(ArtistView, GenreView) {
  //   if (Math.random() < 0.5) {
  //     let screenData = gameData.levels.levelGenre.clon();
  //     [screenData.title, screenData.genre] = this._getRandomQuestion();
  //     screenData.answers = this._getRandomSongs(screenData.answers.length, screenData.genre);
  //     screenData.lives = this.state.lives;
  //     return new GenreView(screenData);
  //   } else {
  //     let screenData = gameData.levels.levelArtist.clon();
  //     screenData.answers = this._getRandomSongs(screenData.answers.length);
  //     screenData.trueSong = this._getUniqueSong(screenData.answers);
  //     screenData.lives = this.state.lives;
  //     return new ArtistView(screenData);
  //   }
  // }

  // _getRandomSongs(quantity, genre) {
  //   let someSongs = new Set();
  //   while (someSongs.size < quantity) {
  //     someSongs.add(getRandomItem(songsData.songs));
  //   }
  //   someSongs = [...someSongs];

  //   if (genre) {
  //     let isGenreTrue = someSongs.some((song) => song.genre === genre);
  //     if (!isGenreTrue) { // если в список не попала песня нужного жанра, добавляем
  //       let genreSongs = songsData.songs.filter((song) => song.genre === genre);
  //       let randomSong = getRandomItem(genreSongs);
  //       someSongs.splice(getRandomInt(someSongs.length - 1), 1, randomSong);
  //     }
  //   }
  //   return someSongs;
  // }

  // _getUniqueSong(songs) {
  //   return getRandomItem(songs);
  // }

  // _getRandomQuestion() {
  //   return getRandomItem([...songsData.questions]);
  // }
}
