export const initialState = Object.freeze({
  screen: `welcome`,
  questions: 10,
  currentQuestion: 0,
  timer: 120,
  minutes: 2,
  seconds: `15`,
  lives: 3,
  mistakes: 0,
  scores: 0,
  fastScore: 0,
  place: 0,
  percentage: 0,
  statisticAnswers: [],
});


// таймер
// подсчет времени каждой попытки
// изменен подсчет статистики + тесты

let gameState = {
  currentState: {},
  get now() {
    return this.currentState;
  },
  set now(newState) {
    this.currentState = newState;
  },
  reset() {
    this.currentState = {};
    let newInitial = JSON.parse(JSON.stringify(initialState));
    return Object.assign(this.currentState, newInitial);
  }
};

export default gameState;

