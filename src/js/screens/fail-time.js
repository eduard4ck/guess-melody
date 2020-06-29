// module5
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';

export default () => {
  let template = `
    <section class="main main--result">
      ${logo()}

      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;

  let module5 = createDom(template).firstChild;

  let logotype = module5.querySelector(`.logo`);
  let retryText = module5.querySelector(`.main-replay`);
  logotype.addEventListener(`click`, onWelcomeRedirect);
  retryText.addEventListener(`click`, onWelcomeRedirect);

  return module5;
};

