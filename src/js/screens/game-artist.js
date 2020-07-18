// module2
import gameState from '../data/game-state';
import data from "../data/data";
import {renderState, isValidAnswer} from '../control/render-controller';
import createDom from '../utils/create-dom';
import mistakes from './common/module-mistake';
import audio, {audioListeners as addAudioListeners} from "./common/audio";

export default (levelData, trueSong) => {

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
      ${mistakes(gameState.now.lives)}
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
  addAudioListeners(module2, playerWrapper);
  const currentTime = gameState.now.timer; // запоминаем таймер, чтобы потом посчитать сколько времени отвечал

  answersList.addEventListener(`click`, (evt) => { // слушатель на варианты ответов - картинки в круге
    if (evt.target.classList.contains(`main-answer-r`)) {
      let isAnswerTrue = isValidAnswer(`levelArtist`, trueSong.id, evt.target.id);
      gameState.now.statisticAnswers.push({
        'answer': isAnswerTrue,
        'time': currentTime - gameState.now.timer
      });
      !isAnswerTrue ? gameState.now.lives-- : false;

      gameState.currentState.screen = data[gameState.now.screen].next();
      renderState();
    }
  });

  return module2;
};
