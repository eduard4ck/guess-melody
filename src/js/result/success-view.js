import View from '../view';
import logo from '../screens/common/logo';

export default class SuccessView extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.scores = screenData.scores;
    this.mistakes = screenData.mistakes;
    this.place = screenData.place;
    this.players = screenData.players;
    this.percentage = screenData.percentage;
    this.minNumber = screenData.minNumber;
    this.secNumber = screenData.secNumber;
    this.minText = screenData.minText;
    this.secText = screenData.secText;
    this.ball = screenData.ball;
    this.oshibok = screenData.oshibok;
  }

  get template() {
    return `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${this.title}</h2>
      <div class="main-stat">За&nbsp;${this.minNumber}&nbsp;${this.minText} и ${this.secNumber}&nbsp;${this.secText}
        <br>вы&nbsp;набрали ${this.scores} ${this.ball}
        <br>совершив ${this.mistakes} ${this.oshibok}</div>
      <span class="main-comparison">Вы заняли ${this.place} место из ${this.players}. 
        Это&nbsp;лучше чем у&nbsp;${this.percentage}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    this.logotype = this.element.querySelector(`.logo`);
    this.retryText = this.element.querySelector(`.main-replay`);
    this.logotype.addEventListener(`click`, this.onReplay);
    this.retryText.addEventListener(`click`, this.onReplay);
  }

  onReplay() {}
}
