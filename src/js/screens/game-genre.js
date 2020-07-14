// module3
import gameState from '../data/game-state';
import {renderState, isValidAnswer} from '../control/render-controller';
import data from "../data/data";
import createDom from '../utils/create-dom';
import timer from './common/module-timer';
import mistakes from './common/module-mistake';
import audio, {audioListeners as addAudioListeners} from "./common/audio";

export default (levelData) => {

  let templateAnswer = (song) => `
    <div class="genre-answer">
      <div class="player-wrapper">
        ${audio(song)}
      </div>
      <input type="checkbox" name="answer" value="answer-${song.value}" id="a-${song.id}">
      <label class="genre-answer-check" for="a-${song.id}"></label>
    </div>`;

  let template = (state) => `
    <section class="main main--level main--level-genre">
      ${timer}
      ${mistakes(gameState.now.lives)}

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
  // console.log(levelData.answers.map((it) => it.genre));

  form.addEventListener(`click`, () => { // проверка, если есть checked песня отключает disabled, иначе - включает
    let isSelectedNote = [...musicNotes].some((it) => it.checked);
    answerButton.disabled = isSelectedNote ? false : true;
  });

  answerButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    let checkedSongs = [...musicNotes].filter((it) => it.checked);
    let isAnswerTrue = isValidAnswer(`levelGenre`, levelData, checkedSongs);
    gameState.now.statisticAnswers.push({
      'answer': isAnswerTrue,
      'time': 30
    });
    !isAnswerTrue ? gameState.now.lives-- : false;

    gameState.currentState.screen = data[gameState.now.screen].next();
    renderState();
  });

  addAudioListeners(module3, form);

  return module3;
};


