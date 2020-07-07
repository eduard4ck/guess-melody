import levelWelcome from '../screens/welcome';
import levelArtist from '../screens/game-artist';
import levelGenre from '../screens/game-genre';
import levelSuccess from '../screens/result-success';
import levelFail from '../screens/result-fail';
import {nextScreen} from '../control/render-controller';


const levels = Object.freeze({
  welcome: {
    title: `Правила игры`,
    text: `Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>Ошибиться можно 3 раза.<br>Удачи!`,
    next: nextScreen,
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
    ],
    next: nextScreen,
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
    ],
    next: nextScreen,
  },
  resultWin: {
    title: `Вы настоящий меломан!`,
    next: `welcome`,
  },
  failTime: {
    title: `Увы и ах!`,
    text: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    next: `welcome`,
  },
  failTries: {
    title: `Какая жалость!`,
    text: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    next: `welcome`,
  },
});

export const levelToRender = new Map([
  [`welcome`, levelWelcome],
  [`levelArtist`, levelArtist],
  [`levelGenre`, levelGenre],
  [`resultWin`, levelSuccess],
  [`failTime`, levelFail],
  [`failTries`, levelFail],
]);

export function randomFrom2Screens() {
  return Math.random() < 0.5 ? `levelArtist` : `levelGenre`;
}

export default levels;
