const initialState = Object.freeze({
  screen: `welcome`,
  questions: 10,
  currentQuestion: 0,
  timer: 120,
  lives: 3,
  score: 0,
  percentage: 0
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
    return Object.assign(this.currentState, initialState);
  }
};

export default gameState;
