class GameData {
  constructor() {
    this.levels = Object.freeze({
      welcome: {
        title: `Правила игры`,
        content: `Правила просты&nbsp;— за&nbsp;2 минуты ответить на все вопросы.<br>Ошибиться можно 3 раза.<br>Удачи!`,
      },
      levelArtist: {
        title: `Кто исполняет эту песню?`,
        answers: [
          {
            artist: `Пелагея`,
            value: 1,
            id: 1,
            img: `http://placehold.it/134x134`,
          },
          {
            artist: `Краснознаменная дивизия имени моей бабушки`,
            value: 2,
            id: 2,
            img: `http://placehold.it/134x134`,
          },
          {
            artist: `Lorde`,
            value: 3,
            id: 3,
            img: `http://placehold.it/134x134`,
          },
        ]
      },
      levelGenre: {
        title: `Выберите инди-рок треки`,
        answers: [
          {
            id: 1,
            audio: ``,
          },
          {
            id: 2,
            audio: ``,
          },
          {
            id: 3,
            audio: ``,
          },
          {
            id: 4,
            audio: ``,
          },
        ]
      },
      resultWin: {
        title: `Вы настоящий меломан!`
      },
      failTime: {
        title: `Увы и ах!`,
        content: `Время вышло!<br>Вы не успели отгадать все мелодии`
      },
      failTries: {
        title: `Какая жалость!`,
        content: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
      }
    });
  }
}

const gameData = new GameData();

const initialState = Object.freeze({
  questions: 10,
  currentQuestion: 0,
  timer: 120,
  lives: 3
});


export {gameData as default, initialState};
