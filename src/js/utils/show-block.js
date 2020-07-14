
export default function showBlock(section, appendTo) {
  if (typeof appendTo === `undefined`) {
    appendTo = document.querySelector(`body .app .main`);
  }
  appendTo.innerHTML = ``;
  appendTo.appendChild(section);
}
