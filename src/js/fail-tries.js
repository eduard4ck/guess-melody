// module4
import createDom from './create-dom';
import {main} from './main';
import appendModule from './show-block';
import module1, {pressPlay as module1Listener, onLogoClick} from './welcome';

let failTries = createDom(
    `<section class="main main--result">
    <section class="logo" title="Угадай мелодию">
      <h1>Угадай мелодию</h1>
    </section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`
);

function retryListener() {
  let retryText = main.querySelector(`.main-replay`);
  let logo = main.querySelector(`.logo`);

  retryText.addEventListener(`click`, onRetryClick);
  logo.addEventListener(`click`, onLogoClick); // слушатель на лого
}

function onRetryClick() {
  appendModule(module1, main);
  module1Listener();
}

export {failTries as default, retryListener as module4Listener};
