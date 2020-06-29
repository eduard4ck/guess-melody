// module4
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';

export default () => {
  let template = `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;

  let module4 = createDom(template).firstChild;

  let logotype = module4.querySelector(`.logo`);
  let retryText = module4.querySelector(`.main-replay`);
  logotype.addEventListener(`click`, onWelcomeRedirect);
  retryText.addEventListener(`click`, onWelcomeRedirect);

  return module4;
};


