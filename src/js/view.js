export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Forbidden to inherit from this class. Only for extended classes`);
    }
  }

  get template() {
    throw new Error(`Need template`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  bind() {}

  render() {
    let div = document.createElement(`div`);
    div.innerHTML = this.template.trim();
    return div.firstChild;
  }
}

Object.prototype.clon = function () {
  return JSON.parse(JSON.stringify(this));
};
