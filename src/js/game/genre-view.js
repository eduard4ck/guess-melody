import View from '../view';
import mistakes from '../screens/common/module-mistake';
import audio from "../screens/common/audio";
import gameState from '../data/game-state1';


export default class ViewLevelGenre extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.songs = screenData.answers;
    this.genre = screenData.genre;
  }

  get template() {
    return `
    <section class="main main--level main--level-genre">
      ${mistakes(gameState.now.lives)}
      <div class="main-wrap">
        <h2 class="title">${this.title}</h2>
        <form class="genre">
          ${this.songs.map((song) => this.templateAnswer(song)).join(``)}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>`;
  }

  templateAnswer(song) {
    return `
    <div class="genre-answer">
      <div class="player-wrapper">
        ${audio(song)}
      </div>
      <input type="checkbox" name="answer" value="answer-${song.value}" id="a-${song.id}">
      <label class="genre-answer-check" for="a-${song.id}"></label>
    </div>`;
  }

  checkValidAnswer(evt) {
    evt.preventDefault();
    let checkedSongs = [...this.musicNotes].filter((it) => it.checked);
    let genredSongs = this.songs.filter((song) => song.genre === this.genre);
    let selectedSongs = this.songs
      .filter((song) => checkedSongs
      .some((it) => it.value.endsWith(song.value)));
    if (genredSongs.length !== selectedSongs.length) return false;

    let isAllSongsTrue = genredSongs
      .every((genredS) => selectedSongs
      .some((selectedS) => selectedS === genredS));
    return isAllSongsTrue;
  }

  onCheck() {
    let isSelectedNote = [...this.musicNotes].some((it) => it.checked);
    this.answerButton.disabled = isSelectedNote ? false : true;
  }

  bind() {
    this.form = this.element.querySelector(`.genre`);
    this.musicNotes = this.element.querySelectorAll(`.genre input[name="answer"]`);
    this.playerWrapper = this.element.querySelector(`.player-wrapper`);
    this.answerButton = this.element.querySelector(`button.genre-answer-send`);

    this.form.addEventListener(`click`, () => this.onCheck());
    this.playerWrapper.addEventListener(`click`, this.onPlay);
    this.answerButton.addEventListener(`click`, (evt) => this.onAnswer(evt));
  }

  onPlay() {}
  onAnswer() {}
}
