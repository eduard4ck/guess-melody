// module4
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';

export default (state) => {
  let template = `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${state.title}</h2>
      <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
        <br>вы&nbsp;набрали 12 баллов (8 быстрых)
        <br>совершив 3 ошибки</div>
      <span class="main-comparison">Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;

  let module4 = createDom(template).firstChild;

  let logotype = module4.querySelector(`.logo`);
  let retryText = module4.querySelector(`.main-replay`);
  logotype.addEventListener(`click`, onWelcomeRedirect);
  retryText.addEventListener(`click`, onWelcomeRedirect);

  return module4;
};

