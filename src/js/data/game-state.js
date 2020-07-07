export const initialState = Object.freeze({
  screen: `welcome`,
  questions: 10,
  currentQuestion: 0,
  rightAnswers: 0,
  timer: 120,
  minutes: 0,
  seconds: `00`,
  lives: 3,
  mistakes: 0,
  score: 0,
  fastScore: 0,
  place: 0,
  allPlayers: 0,
  percentage: 0,
  otherPlayersPercent: 0,
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
