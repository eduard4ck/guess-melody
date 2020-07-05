// module3
import gameState from '../data/game-state';
import {renderState} from '../control/render-controller';
import data from "../data/data";
import getRandomItem from '../utils/get-random-item';
import createDom from '../utils/create-dom';
import timer from './common/module-timer';
import mistakes from './common/module-mistake';
import audio, {audioListeners as addAudioListeners} from "./common/audio";

export default (levelData, trueSong, answerСallback) => {

  let templateAnswer = (song) => `
    <div class="genre-answer">
      <div class="player-wrapper">
        ${audio(song)}
      </div>
      <input type="checkbox" name="answer" value="answer-${song.value}" 
      id="a-${song.id}">
      <label class="genre-answer-check" for="a-${song.id}"></label>
    </div>`;

  let template = (state) => `
    <section class="main main--level main--level-genre">
      ${timer}
      ${mistakes(3)}

      <div class="main-wrap">
        <h2 class="title">${state.title}</h2>
        <form class="genre">
          ${state.answers.map((song) => templateAnswer(song)).join(``)}
          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>`;

  const module3 = createDom(template(levelData)).firstChild;

  let form = module3.querySelector(`.genre`);
  let musicNotes = module3.querySelectorAll(`.genre input[name="answer"]`);
  let answerButton = module3.querySelector(`.genre-answer-send`);
  answerButton.disabled = true;

  form.addEventListener(`click`, () => { // проверка есть ли checked песня
    answerButton.disabled = true;
    let note = [...musicNotes].some((it) => it.checked);
    note ? answerButton.disabled = false : false;
  });
  answerButton.addEventListener(`click`, onAnswerClick);
  addAudioListeners(module3, form);

  return module3;
};

function onAnswerClick(evt) {
  evt.preventDefault();
  let modules = data[gameState.now.screen].next; // array
  gameState.currentState.screen = getRandomItem(modules);
  renderState();
}

