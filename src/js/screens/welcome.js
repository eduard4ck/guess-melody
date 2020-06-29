// module1
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';
import showBlock from '../utils/show-block';
import module2 from './game-artist.js';

export default function () {
  const template = `
    <section class="main main--welcome">
      ${logo()}

      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
        Ошибиться можно 3 раза.<br>
        Удачи!
      </p>
    </section>`;

  const module1 = createDom(template).firstChild;
  const playButton = module1.querySelector(`.main-play`);
  playButton.addEventListener(`click`, () => showBlock(module2()));

  let logotype = module1.querySelector(`.logo`);
  logotype.addEventListener(`click`, onWelcomeRedirect);

  return module1;
}
