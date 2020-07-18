export const initialState = Object.freeze({
  screen: `welcome`,
  questions: 10,
  currentQuestion: 0,
  timer: 120,
  lives: 3,
  mistakes: 0,
  scores: 0,
  fastAnswer: 10, // если ответ быстрее чем за n секунд, значит он быстрый
  place: 0,
  percentage: 0,
  statisticAnswers: [],
});

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

