import '../styles/index.css';

class Keyboard {
  constructor() {
    this.textarea = null;
    this.keysContainer = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
  }

  createHtmlElements() {
    const main = document.createElement('main');
    const keyboardContainer = document.createElement('div');
    const title = document.createElement('h1');
    const systemInfo = document.createElement('h3');
    const textarea = document.createElement('textarea');
    const keysContainer = document.createElement('div');

    document.body.appendChild(main);
    main.classList.add('main');
    main.appendChild(keyboardContainer);
    keyboardContainer.classList.add('container');
    keyboardContainer.appendChild(title);
    title.classList.add('title');
    keyboardContainer.appendChild(systemInfo);
    systemInfo.classList.add('subtitle');
    keyboardContainer.appendChild(textarea);
    textarea.classList.add('textarea');
    keyboardContainer.appendChild(keysContainer);
    keysContainer.classList.add('keyboard');
    keysContainer.appendChild(this.createKeyElements());

    title.textContent = 'Virtual keyboard by Alex Pirko, RSS';
    systemInfo.textContent = 'The keyboard was created on Windows. To change the language press Ctrl + Alt';
  }

  createKeyElements() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'delete',
      'capsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    keyLayout.forEach((key) => {
      const keyEl = document.createElement('button');
      const lineBreak = ['backspace', 'delete', 'enter', 'shift'].indexOf(key) !== -1;

      keyEl.classList.add('keybtn');
      keyEl.setAttribute('type', 'button');

      switch (key) {
        case 'backspace':
          keyEl.classList.add('keybtn__extrawide');
          keyEl.textContent = 'Backspace';

          keyEl.addEventListener('click', () => {
            this.properties.value = this.propeprties.value.substring(0, this.properties.value.length - 1);
          });

          break;

        case 'tab':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Tab';

          keyEl.addEventListener('click', () => {
            this.properties.value += '\t';
          });

          break;

        case 'delete':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Del';

          keyEl.addEventListener('click', () => {
            this.properties.value = this.propeprties.value.substring(0, this.properties.value.length + 1);
          });

          break;

        case 'capsLock':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'CapsLock';

          keyEl.addEventListener('click', () => {
            this._toggleCapsLock();
          });

          break;

        case 'enter':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'Enter';

          keyEl.addEventListener('click', () => {
            this.properties.value += '\n';
          });

          break;

        case 'shift':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'Shift';

          keyEl.addEventListener('click', () => {

          });

          break;

        case 'space':
          keyEl.classList.add('keybtn__superwide');

          keyEl.addEventListener('click', () => {
            this.properties.value += '';
          });

          break;

        case 'ctrl':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Ctrl';

          break;

        case 'win':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Win';

          break;

        case 'alt':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Alt';

          break;

        default:
          keyEl.textContent = key.toLowerCase();

          keyEl.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
          });
      }

      fragment.appendChild(keyEl);

    });

    return fragment;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.createHtmlElements();
});