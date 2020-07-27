class GameState {
  constructor() {
    this.initialState = Object.freeze({
      questions: 5,
      currentQuestion: 0,
      timer: 120,
      lives: 3
    });
    this._state = {};
  }

  get now() {
    return this._state;
  }

  duplicate(object) {
    return JSON.parse(JSON.stringify(object));
  }

  nextQuestion() {
    this._state.currentQuestion++;
    return this._state.currentQuestion;
  }

  tick() {
    this._state.timer--;
    return this._state.timer;
  }

  setLives(answer) {
    answer === false ? this._state.lives-- : void 0;
    return this._state.lives;
  }

  reset() {
    let newInitial = this.duplicate(this.initialState);
    return Object.assign(this._state, newInitial);
  }
}

let gameState = new GameState();
export default gameState;
