// module4
import createDom from '../utils/create-dom';
import logo, {onWelcomeRedirect} from './common/logo';
import declension from '../utils/word-declension';

export default (levelData) => {
  let min = declension(levelData.minutes, [`минуту`, `минуты`, `минут`]);
  let sec = declension(levelData.seconds, [`секунду`, `секунды`, `секунд`]);
  let ball = declension(levelData.scores, [`балл`, `балла`, `баллов`]);
  let oshibok = declension(levelData.mistakes, [`ошибку`, `ошибки`, `ошибок`]);

  let template = `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${levelData.title}</h2>
      <div class="main-stat">За&nbsp;${levelData.minutes}&nbsp;${min} и ${levelData.seconds}&nbsp;${sec}
        <br>вы&nbsp;набрали ${levelData.scores} ${ball} (${levelData.fastScore} быстрых)
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

  return module4;
};

// Функция для составления правильных падежей слов
// https://realadmin.ru/coding/sklonenie-na-javascript.html
