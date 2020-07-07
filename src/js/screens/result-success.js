// module4
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';

export default (levelData) => {
  let template = `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${levelData.title}</h2>
      <div class="main-stat">За&nbsp;${levelData.minutes}&nbsp;минуты и ${levelData.seconds}&nbsp;секунд
        <br>вы&nbsp;набрали ${levelData.score} баллов (${levelData.fastScore} быстрых)
        <br>совершив ${levelData.mistakes} ошибок</div>
      <span class="main-comparison">Вы заняли ${levelData.place} место из ${levelData.allPlayers}. 
        Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;

  let module4 = createDom(template).firstChild;

  let logotype = module4.querySelector(`.logo`);
  let retryText = module4.querySelector(`.main-replay`);
  logotype.addEventListener(`click`, onWelcomeRedirect);
  retryText.addEventListener(`click`, onWelcomeRedirect);

  return module4;
};

// Функция для составления правильных падежей слов
// https://realadmin.ru/coding/sklonenie-na-javascript.html
