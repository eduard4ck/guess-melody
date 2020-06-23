// module3
import randomInt from './random';
import createDom from './create-dom';
import {main} from './main';
import appendModule from './show-block';
import module4, {module4Listener} from './fail-tries';
import module5, {module5Listener} from './fail-time';

let gameGenre = createDom(
    `<section class="main main--level main--level-genre">
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
          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--pause"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-1">
            <label class="genre-answer-check" for="a-1"></label>
          </div>

          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-2">
            <label class="genre-answer-check" for="a-2"></label>
          </div>

          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-3">
            <label class="genre-answer-check" for="a-3"></label>
          </div>

          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-4">
            <label class="genre-answer-check" for="a-4"></label>
          </div>

          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>`
);

function onButtonClick() {
  let form = main.querySelector(`.genre`);
  let musicNotes = main.querySelectorAll(`.genre input[value="answer-1"]`);
  let answerButton = main.querySelector(`.genre-answer-send`);
  answerButton.disabled = true;

  form.addEventListener(`click`, () => { // проверка есть ли checked песня
    answerButton.disabled = true;
    let note = [...musicNotes].some((it) => it.checked);
    note ? answerButton.disabled = false : false;
  });

  answerButton.addEventListener(`click`, onAnswerClick);
}

function onAnswerClick(evt) {
  evt.preventDefault();
  let modules = [
    {
      "module": module4,
      "listener": module4Listener
    },
    {
      "module": module5,
      "listener": module5Listener
    }
  ];

  let i = randomInt(0, modules.length - 1); // переключаем на случайный последний модуль
  appendModule(modules[i].module, main);
  modules[i].listener();
}

export {gameGenre as default, onButtonClick};
