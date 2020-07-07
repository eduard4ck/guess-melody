// module5
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';

export default (state) => {
  let template = `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${state.title}</h2>
      <div class="main-stat">${state.text}</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;

  let module5 = createDom(template).firstChild;

  let logotype = module5.querySelector(`.logo`);
  let retryText = module5.querySelector(`.main-replay`);
  logotype.addEventListener(`click`, onWelcomeRedirect);
  retryText.addEventListener(`click`, onWelcomeRedirect);

  return module5;
};


