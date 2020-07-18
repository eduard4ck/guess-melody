import createDom from '../../utils/create-dom';
import showBlock from '../../utils/show-block';
import gameState, {initialState} from '../../data/game-state';
import {renderState} from '../../control/render-controller';


let tickClock = (() => {
  let intervalId = false;
  return function (min, sec) {

    function stopTimer() {
      clearInterval(intervalId); intervalId = false;
    }

    // Если вызвать функцию с заданными ключами в объекте this, функция может сказать запущен ли таймер,
    // или остановить его. Пока предыдущий таймер не очищен, второй раз запустить его нельзя
    if (this !== undefined && this.question) return intervalId ? `Timer is run` : false;
    if (this !== undefined && this.stopTimer) {
      stopTimer();
      return;
    }
    if (intervalId) return;


    let timer = gameState.now.timer;
    intervalId = setInterval(() => {
      --timer;
      gameState.now.timer = timer;

      let minText = Math.trunc(timer / 60) < 10 ? `0${Math.trunc(timer / 60)}` : Math.trunc(timer / 60);
      let secText = timer % 60 < 10 ? `0${timer % 60}` : timer % 60;
      [min.textContent, sec.textContent] = [minText, secText];

      let svgCircle = document.querySelector(`body .app svg.timer circle`); // анимация svg
      let dash = getSvgDash(initialState.timer, timer, svgCircle.r.baseVal.value);
      svgCircle.style.strokeDasharray = dash.stroke;
      svgCircle.style.strokeDashoffset = dash.offset;

      if (timer < 0) {
        stopTimer();
        gameState.now.screen = `failTime`;
        renderState();
      }
    }, 1000);
  };
})();

function startTimerInApp() {
  // передаем в this нужный ключ, чтобы функция сказала работает ли таймер, но не запускалась
  let isTimerRun = tickClock.call({question: true});
  if (isTimerRun === `Timer is run`) return;

  let app = document.querySelector(`body .app`);
  let cb = (dom, appendTo) => appendTo.prepend(dom);
  showBlock(timerModule(), app, cb);
}

function clearTimerInApp() {
  let app = document.querySelector(`body .app`);
  let svg = app.querySelector(`svg.timer`);
  let divClock = app.querySelector(`div.timer-value`);

  if (svg && divClock) {
    tickClock.call({stopTimer: true});
    svg.remove();
    divClock.remove();
  }
}

function getSvgDash(fullTime, currentTime, radius) { // получить stroke-dasharray и stroke-dashoffset
  if (!fullTime || !radius || currentTime.constructor !== Number || fullTime < 0 ||
     currentTime < 0 || currentTime > fullTime) return {stroke: 0, offset: 0};

  let stroke = 2 * Math.PI * radius;
  let offsetStep = stroke / fullTime;
  let offset = (fullTime - currentTime) * offsetStep;
  return {stroke, offset};
}


let timerModule = () => {
  let template = (timer) => {
    let minText = Math.trunc(timer / 60) < 10 ? `0${Math.trunc(timer / 60)}` : Math.trunc(timer / 60);
    let secText = timer % 60 < 10 ? `0${timer % 60}` : timer % 60;

    return `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line" stroke-dasharray="2325" stroke-dashoffset="0"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml" style="top: 65px"> 
      <span class="timer-value-mins">${minText}</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">${secText}</span>
    </div>`;
  };

  const moduleTimer = createDom(template(gameState.now.timer));

  let min = moduleTimer.querySelector(`div .timer-value-mins`);
  let sec = moduleTimer.querySelector(`div .timer-value-secs`);
  tickClock(min, sec);

  return moduleTimer;
};

export {timerModule as default, startTimerInApp, clearTimerInApp, getSvgDash};
