// module2
import createDom from '../utils/create-dom';
import showBlock from '../utils/show-block';
import module3 from './game-genre';

let ob = [
  {id: 1, value: 1, src: `http://placehold.it/134x134`, alt: `Пелагея`},
  {id: 2, value: 2, src: `http://placehold.it/134x134`, alt: `Краснознаменная дивизия имени моей бабушки`},
  {id: 3, value: 3, src: `http://placehold.it/134x134`, alt: `Lorde`},
];

export default () => {
  let template = `
    <section class="main main--level main--level-artist">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">05</span>
          <!--
        --><span class="timer-value-dots">:</span>
          <!--
        --><span class="timer-value-secs">00</span>
        </div>
      </svg>
      <div class="main-mistakes">
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      </div>

      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${ob.map((it) => `
            <div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${it.id}" name="answer" value="val-${it.value}" />
              <label class="main-answer" for="answer-${it.id}">
                <img class="main-answer-preview" src="${it.src}" alt="${it.alt}" width="134" height="134">
                ${it.alt}
              </label>
            </div>`).join(``)}
        </form>
      </div>
    </section>`;

  const module2 = createDom(template).firstChild;
  let answersList = module2.querySelector(`.main-list`);

  answersList.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`main-answer-r`)) {
      showBlock(module3());
    }
  });

  return module2;
};
