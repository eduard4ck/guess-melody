// module5
import createDom from './create-dom';

let failTime = createDom(
    `<section class="main main--result">
    <section class="logo" title="Угадай мелодию">
      <h1>Угадай мелодию</h1>
    </section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`
);


export default failTime;
export {module4Listener as module5Listener} from './fail-tries';
