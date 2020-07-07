export default (song) => `
  <div class="player">
    <audio src="${song.mp3}">${song.genre}</audio>
    <button class="player-control player-control--play"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>`;


/* Функция принимает сам модуль (screen), и контейнер в котором находяться аудиофайлы */
export function audioListeners(module, songContainer) {

  let playerDivs = module.querySelectorAll(`.player`);
  let allPlayButtons = module.querySelectorAll(`.player-control`);

  let songObject = (div) => { // создание объекта для играющей песни
    return {
      audio: div.querySelector(`audio`),
      playButton: div.querySelector(`.player-control`),
      onPausePlay(thisAudio, playButton) { // принимает песню и кнопку на неё
        return () => {
          playButton.classList.contains(`player-control--pause`) ? thisAudio.pause() : thisAudio.play();
          playButton.classList.toggle(`player-control--play`);
          playButton.classList.toggle(`player-control--pause`);
        };
      },
      onEnded(thisAudio, playButton) { // принимает песню и кнопку на неё
        return () => {
          thisAudio.pause();
          playButton.classList.add(`player-control--play`);
          playButton.classList.remove(`player-control--pause`);
          window.playingSong = null;
        };
      }
    };
  };

  /* Слушатель на проигрывание песен */
  songContainer.addEventListener(`click`, (evt) => {
    allPlayButtons.forEach((button) => button.contains(evt.target) ? evt.preventDefault() : false);

    playerDivs.forEach((div) => {
      // если нажал в приделах блока, остановит предыдущий трек, запустит новый
      if (div.contains(evt.target)) {
        let song = songObject(div);

        if (window.playingSong && window.playingSong.audio !== song.audio) { // из глобала останавливаем песню если нужно
          window.playingSong.onEnded(window.playingSong.audio, window.playingSong.playButton)();
        }
        setTimeout(() => window.playingSong = !song.audio.paused ? song : null, 0); // играющую песню в глобал

        song.audio.volume = 0.2;
        song.onPausePlay(song.audio, song.playButton)();

        song.audio.removeEventListener(`ended`, song.onEnded(song.audio, song.playButton));
        song.audio.addEventListener(`ended`, song.onEnded(song.audio, song.playButton));
      }
    });
  });
}
