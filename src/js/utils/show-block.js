let main = document.querySelector(`body .app .main`);

export default function showBlock(section, appendTo = main) {
  appendTo.innerHTML = ``;
  appendTo.appendChild(section);
}
