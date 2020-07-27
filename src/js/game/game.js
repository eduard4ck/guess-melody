import App from '../main';
import ArtistView from './artist-view';
import GenreView from './genre-view';
import gameState from '../data/game-state1';
import gameData from '../data/game-data1';
import songsData from '../data/songs-data1';
import statistics from '../data/game-statistics1';
import showBlock from '../utils/show-block';


class Game {
  constructor() {}

  duplicate(object) {
    return JSON.parse(JSON.stringify(object));
  }

  generateLevel() {
    if (Math.random() < 0.5) {
      let screenData = this.duplicate(gameData.levels.levelGenre);
      [screenData.title, screenData.genre] = songsData.getRandomQuestion();
      screenData.answers = songsData.getRandomSongs(screenData.answers.length, screenData.genre);
      console.log(screenData.answers.map((song) => song.genre));
      return new GenreView(screenData);
    } else {
      let screenData = this.duplicate(gameData.levels.levelArtist);
      screenData.answers = songsData.getRandomSongs(screenData.answers.length);
      screenData.trueSong = songsData.getUniqueSong(screenData.answers);
      return new ArtistView(screenData);
    }
  }

  onAnswer(evt) {
    let isAnswerTrue = this.checkValidAnswer(evt);
    if (typeof isAnswerTrue === `undefined`) return;
    statistics.pushAnswer(isAnswerTrue, 7); // change answer time
    gameState.setLives(isAnswerTrue);
    App.showGame();
  }

  onPlay() {
    console.log(`playing`);
  }

  init() {
    if (gameState.now.lives < 1 || gameState.now.currentQuestion >= gameState.now.questions) {
      return App.showResult();
    }
    this.view = this.generateLevel();
    [this.view.onPlay, this.view.onAnswer] = [this.onPlay, this.onAnswer];
    gameState.nextQuestion();
    showBlock(this.view.element);
    // console.log(statistics.now.statisticAnswers);
  }
}

let game = new Game();
export default game;
