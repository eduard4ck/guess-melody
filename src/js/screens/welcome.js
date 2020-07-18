// module1
import gameState from '../data/game-state';
import {renderState} from '../control/render-controller';
import data from "../data/data";
import createDom from '../utils/create-dom';
import {startTimerInApp} from './common/module-timer';
import logo, {onWelcomeRedirect} from './common/logo';


export default (levelData) => {
  const template = (state) =>`
    <section class="main main--welcome">
      ${logo()}

      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">${state.title}</h2>
      <p class="text main-text">
        ${state.text}
      </p>
    </section>`;

  const module1 = createDom(template(levelData)).firstChild;
  const playButton = module1.querySelector(`.main-play`);
  playButton.addEventListener(`click`, () => {
    gameState.currentState.screen = data[gameState.now.screen].next();
    startTimerInApp();
    renderState();
  });

  let logotype = module1.querySelector(`.logo`);
  logotype.addEventListener(`click`, onWelcomeRedirect);

  return module1;
};
