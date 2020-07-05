import gameState from '../../data/game-state';
import {renderState} from '../../control/render-controller';

export default () => `
  <section class="logo"title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
`;

export let onWelcomeRedirect = () => {
  gameState.reset();
  renderState();
};

