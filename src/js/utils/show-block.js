
/* Функция может принять однин параметр - дом ноду, и заапендить в .main
*  Может принять два параметра и заапендит контейнер либо дом ноду в другую ноду (appendTo)
*  Если передать три параметра то, что и куда аппендить, будет решать колбэк
*/

export default function showBlock(section, appendTo, cb) {
  if (cb) {
    cb(section, appendTo);
    return;
  }

  if (typeof appendTo === `undefined`) {
    appendTo = document.querySelector(`body .app .main`);
  }
  appendTo.innerHTML = ``;
  appendTo.append(section);
}
