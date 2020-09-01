import { SomeObj, IClass } from '../interfaces/index';
import { initialState } from '../data/game-data';


export default class GameModel {
  private _state: SomeObj

  constructor() {
    this._state = {};
    this.reset();
  }

  get state(): SomeObj {
    return this._state;
  }

  nextQuestion(): number {
    return ++this.state.currentQuestion;
  }

  tick(): number {
    return --this.state.timer;
  }

  setLives(answer: boolean): number {
    answer === false ? this.state.lives-- : void 0;
    return this.state.lives;
  }

  private reset(): SomeObj {
    return Object.assign(this.state, initialState);
  }

  getSomeScreen(ScreenView: IClass, data: SomeObj): SomeObj { // && указать что return экземпляр ScreenView
    data.lives = this.state.lives;
    return new ScreenView(data);
  }
}

