// module3
import randomInt from '../utils/random';
import createDom from '../utils/create-dom';
import showBlock from '../utils/show-block';
import module4 from './fail-tries';
import module5 from './fail-time';

let ob = [
  {id: 1, value: 1, status: `pause`},
  {id: 2, value: 2, status: `play`},
  {id: 3, value: 3, status: `play`},
  {id: 4, value: 4, status: `play`}
];

export default () => {
  let template = `
    <section class="main main--level main--level-genre">
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
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      </div>

      <div class="main-wrap">
        <h2 class="title">Выберите инди-рок треки</h2>
        <form class="genre">
          ${ob.map((it) => `
            <div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio></audio>
                  <button class="player-control player-control--${it.status}">
                  </button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="answer-${it.value}" 
              id="a-${it.id}">
              <label class="genre-answer-check" for="a-${it.id}"></label>
            </div>
          `).join(``)}

          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>`;

  const module3 = createDom(template).firstChild;

  let form = module3.querySelector(`.genre`);
  let musicNotes = module3.querySelectorAll(`.genre input[name="answer"]`);
  let answerButton = module3.querySelector(`.genre-answer-send`);
  answerButton.disabled = true;

  form.addEventListener(`click`, () => { // проверка есть ли checked песня
    answerButton.disabled = true;
    let note = [...musicNotes].some((it) => it.checked);
    note ? answerButton.disabled = false : false;
  });
  answerButton.addEventListener(`click`, onAnswerClick);

  return module3;
};

function onAnswerClick(evt) {
  evt.preventDefault();
  let modules = [module4(), module5()];
  let i = randomInt(0, modules.length - 1); // на случайный последний модуль
  showBlock(modules[i]);
}

