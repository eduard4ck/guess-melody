export default function createDomElement(html) {
  let el = document.createElement(`template`);
  el.innerHTML = html.trim();
  return el.content;
}

