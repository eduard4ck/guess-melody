// module4
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';
import declension from '../utils/word-declension';
import {initialState} from '../data/game-state';
import {clearTimerInApp} from './common/module-timer';

export default (levelData) => {
  let minNumber = Math.trunc((initialState.timer - levelData.timer) / 60);
  let secNumber = (initialState.timer - levelData.timer) % 60;
  let minText = declension(minNumber, [`минуту`, `минуты`, `минут`]);
  let secText = declension((initialState.timer - levelData.timer) % 60, [`секунду`, `секунды`, `секунд`]);
  let ball = declension(levelData.scores, [`балл`, `балла`, `баллов`]);
  let oshibok = declension(levelData.mistakes, [`ошибку`, `ошибки`, `ошибок`]);

  let template = `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${levelData.title}</h2>
      <div class="main-stat">За&nbsp;${minNumber}&nbsp;${minText} и ${secNumber}&nbsp;${secText}
        <br>вы&nbsp;набрали ${levelData.scores} ${ball}
        <br>совершив ${levelData.mistakes} ${oshibok}</div>
      <span class="main-comparison">Вы заняли ${levelData.place} место из ${levelData.players}. 
        Это&nbsp;лучше чем у&nbsp;${levelData.percentage}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;

  let module4 = createDom(template).firstChild;

  let logotype = module4.querySelector(`.logo`);
  let retryText = module4.querySelector(`.main-replay`);
  logotype.addEventListener(`click`, onWelcomeRedirect);
  retryText.addEventListener(`click`, onWelcomeRedirect);
  clearTimerInApp();

  return module4;
};

// Функция для составления правильных падежей слов
// https://realadmin.ru/coding/sklonenie-na-javascript.html
// https://www.youtube.com/watch?v=BAfiXPkubYw  - таймер на js, плавный на ООП
