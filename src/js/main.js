// import gameState from './data/game-state';
// import {renderState} from './control/render-controller';


// gameState.reset();
// renderState();

import welcome from './welcome/welcome';
import game from './game/game';
import result from './result/result';

class App {
  constructor() {}

  static showWelcome() {
    welcome.init();
  }

  static showGame() {
    game.init();
  }

  static showResult() {
    result.init();
  }

  static init() {
    this.showWelcome();
  }
}

App.init();

export default App;
