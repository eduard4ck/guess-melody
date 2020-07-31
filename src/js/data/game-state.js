class GameState {
  constructor() {
    this.initialState = Object.freeze({
      questions: 5,
      currentQuestion: 0,
      timer: 10,
      lives: 3
    });
    this._state = {};
  }

  get now() {
    return this._state;
  }

  nextQuestion() {
    this.now.currentQuestion++;
    return this.now.currentQuestion;
  }

  tick() {
    this.now.timer--;
    return this.now.timer;
  }

  setLives(answer) {
    answer === false ? this.now.lives-- : void 0;
    return this.now.lives;
  }

  reset() {
    let newInitial = this.initialState.clon();
    return Object.assign(this.now, newInitial);
  }
}

let gameState = new GameState();
export default gameState;
