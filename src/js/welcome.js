// module1
import createDom from './create-dom';
import {main} from './main';
import appendModule from './show-block';
import module2, {pressAnswers as module2Listener} from './game-artist';


let welcomeBlock = createDom(
    `<section class="main main--welcome">
      <section class="logo" title="Угадай мелодию">
        <h1>Угадай мелодию</h1>
      </section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
        Ошибиться можно 3 раза.<br>
        Удачи!
      </p>
    </section>`
);

function onLogoClick() {
  appendModule(welcomeBlock, main);
  pressPlay();
}

function pressPlay() {
  let playButton = main.querySelector(`.main-play`);
  let logo = main.querySelector(`.logo`);

  logo.addEventListener(`click`, onLogoClick);
  playButton.addEventListener(`click`, nextBlock);
}

function nextBlock() {
  appendModule(module2, main);
  module2Listener();
}

export {welcomeBlock as default, pressPlay, onLogoClick};
