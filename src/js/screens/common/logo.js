import showBlock from '../../utils/show-block';
import module1 from '../welcome';

export default () => `
  <section class="logo"title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
`;

export let onWelcomeRedirect = () => showBlock(module1());
