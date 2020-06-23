export default function createDomElement(html) {
  let el = document.createElement(`div`);
  el.innerHTML = html.trim();
  return el.firstChild;
}

