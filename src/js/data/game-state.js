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
  get state() {
    return this.currentState;
  },
  set state(newState) {
    this.currentState = newState;
  },
  resetState() {
    Object.freeze(this.currentState, initialState);
  }
};

export default gameState;
