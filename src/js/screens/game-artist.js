// module2
import gameState from '../data/game-state';
import {renderState} from '../control/render-controller';
import data from "../data/data";
import createDom from '../utils/create-dom';
import timer from './common/module-timer';
import mistakes from './common/module-mistake';
import audio, {audioListeners as addAudioListeners} from "./common/audio";

export default (levelData, trueSong, answerСallback) => {

  let templateAnswer = (song) => `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${song.id}" name="answer" value="val-${song.value}" />
      <label class="main-answer" for="answer-${song.id}">
        <img class="main-answer-preview" src="${song.img}" alt="${song.artist}" width="134" height="134">
        ${song.artist}
      </label>
    </div>`;

  let templateMain = `
    <section class="main main--level main--level-artist">
      ${timer}
      ${mistakes(2)}
      <div class="main-wrap">
        <h2 class="title main-title">${levelData.title}</h2>
        <div class="player-wrapper">${audio(trueSong)}</div>
        <form class="main-list">
          ${levelData.answers.map((song) => templateAnswer(song)).join(``)}
        </form>
      </div>
    </section>`;

  const module2 = createDom(templateMain).firstChild;
  let answersList = module2.querySelector(`.main-list`);
  let playerWrapper = module2.querySelector(`.player-wrapper`);

  answersList.addEventListener(`click`, (evt) => { // слушатель на варианты ответов, картинки в круге
    if (evt.target.classList.contains(`main-answer-r`)) {
      gameState.currentState.screen = data[gameState.now.screen].next;
      renderState();
    }
  });

  addAudioListeners(module2, playerWrapper);

  return module2;
};
