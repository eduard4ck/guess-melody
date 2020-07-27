import View from '../view';
import mistakes from '../screens/common/module-mistake';
import audio from "../screens/common/audio";
import gameState from '../data/game-state1';


export default class ViewLevelArtist extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.songs = screenData.answers;
    this.trueSong = screenData.trueSong;
  }

  get template() {
    return `
    <section class="main main--level main--level-artist">
      ${mistakes(gameState.now.lives)}
      <div class="main-wrap">
        <h2 class="title main-title">${this.title}</h2>
        <div class="player-wrapper">${audio(this.trueSong)}</div>
        <form class="main-list">
          ${this.songs.map((song) => this.templateAnswer(song)).join(``)}
        </form>
      </div>
    </section>`;
  }

  templateAnswer(song) {
    return `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${song.id}" name="answer" value="val-${song.value}" />
      <label class="main-answer" for="answer-${song.id}">
        <img class="main-answer-preview" src="${song.img}" alt="${song.artist}" width="134" height="134">
        ${song.artist}
      </label>
    </div>`;
  }

  checkValidAnswer(evt) {
    if (evt.target.classList.contains(`main-answer-r`)) {
      return evt.target.id.endsWith(this.trueSong.id) ? true : false;
    }
  }

  bind() {
    this.form = this.element.querySelector(`.main-list`);
    this.playerWrapper = this.element.querySelector(`.player-wrapper`);
    this.form.addEventListener(`click`, (evt) => this.onAnswer(evt));
    this.playerWrapper.addEventListener(`click`, this.onPlay);
  }

  onAnswer() {}
  onPlay() {}
}
