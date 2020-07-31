import Router from '../main';
import ArtistView from './artist-view';
import GenreView from './genre-view';
import gameState from '../data/game-state';
import gameData from '../data/game-data';
import songsData from '../data/songs-data';
import statistics from '../data/game-statistics';
import showBlock from '../utils/show-block';


class GamePresenter {
  constructor() {
    this.view = this._generateLevel();
  }

  init() {
    if (gameState.now.lives < 1 || gameState.now.currentQuestion >= gameState.now.questions) {
      return Router.showResult();
    }
    this.view.onPlay = this.onPlay.bind(this);
    this.view.onAnswer = this.onAnswer;
    this.view.currentTime = gameState.now.timer;
    gameState.nextQuestion();
    showBlock(this.view.element);
    // console.log(statistics.now.statisticAnswers);
  }

  onAnswer(evt) {
    let isAnswerTrue = this.checkValidAnswer(evt);
    if (typeof isAnswerTrue === `undefined`) return;
    statistics.pushAnswer(isAnswerTrue, this.currentTime - gameState.now.timer);
    gameState.setLives(isAnswerTrue);
    Router.showGame();
  }


  onPlay(evt) {
    let cls = evt.target.classList;
    if (cls.contains(`player`) || cls.contains(`player-control`)) {
      evt.preventDefault();

      let clickedDiv = [...this.view.playerDivs].find((div) => div.contains(evt.target));
      let song = this._getSongObject(clickedDiv);

      if (this.view._playingSong && this.view._playingSong.audio !== song.audio) { // останавливаем песню
        this.view._playingSong.onEnded();
      }

      song.audio.volume = 0.2;
      song.playOrPause();

      song.audio.addEventListener(`ended`, () => song.onEnded());
      this.view._playingSong = !song.audio.paused ? song : null; // записываем играющую песню
    }
  }

  _generateLevel() {
    if (Math.random() < 0.5) {
      let screenData = gameData.levels.levelGenre.clon();
      [screenData.title, screenData.genre] = songsData.getRandomQuestion();
      screenData.answers = songsData.getRandomSongs(screenData.answers.length, screenData.genre);
      // console.log(screenData.answers.map((song) => song.genre));
      return new GenreView(screenData);
    } else {
      let screenData = gameData.levels.levelArtist.clon();
      screenData.answers = songsData.getRandomSongs(screenData.answers.length);
      screenData.trueSong = songsData.getUniqueSong(screenData.answers);
      return new ArtistView(screenData);
    }
  }

  _getSongObject(div) {
    let that = this;
    return {
      audio: div.querySelector(`audio`),
      playButton: div.querySelector(`.player-control`),
      playOrPause() {
        this.playButton.classList.contains(`player-control--pause`) ? this.audio.pause() : this.audio.play();
        this.playButton.classList.toggle(`player-control--play`);
        this.playButton.classList.toggle(`player-control--pause`);
      },
      onEnded() {
        this.audio.pause();
        this.playButton.classList.add(`player-control--play`);
        this.playButton.classList.remove(`player-control--pause`);
        that.view._playingSong = null;
      }
    };
  }
}

export default GamePresenter;

