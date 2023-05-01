import '../styles/index.css';

class Keyboard {
  constructor() {
    this.textarea = null;
    this.keysContainer = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
    this.shift = false;

    this.engKeyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'delete',
      'capsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    this.shiftEngLayout = [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'delete',
      'capsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'shift',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    this.ruKeyLayout = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'delete',
      'capsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    this.shiftRuLayout = [
      'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
      'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|', 'delete',
      'capsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
      'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'shift',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    this.keyLayout = localStorage.getItem('layout') || 'eng';
    this.setLanguage();
  }

  init() {
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
    textarea.setAttribute('id', 'textarea');
    keyboardContainer.appendChild(keysContainer);
    keysContainer.classList.add('keyboard');
    keysContainer.appendChild(this.createKeyElements());

    this.keys = keysContainer.querySelectorAll('.keybtn__letter');

    title.textContent = 'Virtual keyboard by Alex Pirko, RSS';
    systemInfo.textContent = 'The keyboard was created on Windows. To change the language press Ctrl + Alt';
  }

  setLanguage() {
    if (this.keyLayout === 'eng') {
      this.keyLayout = this.engKeyLayout;
    } else if (this.keyLayout === 'ru') {
      this.keyLayout = this.ruKeyLayout;
    }
  }

  shiftLayout() {
    if (this.keyLayout === this.engKeyLayout) {
      this.keyLayout = this.shiftEngLayout;
    } else if (this.keyLayout === this.ruKeyLayout) {
      this.keyLayout = this.shiftRuLayout;
    }
    document.querySelector('.keyboard').textContent = '';
    document.querySelector('.keyboard').appendChild(this.createKeyElements());
  }

  unShiftLayout() {
    if (this.keyLayout === this.shiftEngLayout) {
      this.keyLayout = this.engKeyLayout;
    } else if (this.keyLayout === this.shiftRuLayout) {
      this.keyLayout = this.ruKeyLayout;
    }
    document.querySelector('.keyboard').textContent = '';
    document.querySelector('.keyboard').appendChild(this.createKeyElements());
  }

  changeLanguage() {
    this.keyLayout = this.keyLayout === this.engKeyLayout ? this.ruKeyLayout : this.engKeyLayout;
    if (this.keyLayout === this.engKeyLayout) {
      localStorage.setItem('layout', 'eng');
    } else if (this.keyLayout === this.ruKeyLayout) {
      localStorage.setItem('layout', 'ru');
    }
    document.querySelector('.keyboard').textContent = '';
    document.querySelector('.keyboard').appendChild(this.createKeyElements());
  }

  createKeyElements() {
    const fragment = document.createDocumentFragment();

    this.keyLayout.forEach((key, i) => {
      const keyEl = document.createElement('button');

      keyEl.classList.add('keybtn');
      keyEl.setAttribute('type', 'button');

      const keyCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
        'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
        'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
        'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
        'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

      keyEl.setAttribute('id', keyCode[i]);

      switch (key) {
        case 'backspace':
          keyEl.classList.add('keybtn__extrawide');
          keyEl.textContent = 'Backspace';

          keyEl.addEventListener('click', () => {
            this.value = this.value
              .substring(0, this.value.length - 1);
            this.printText(this.value);
          });

          break;

        case 'tab':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Tab';

          keyEl.addEventListener('click', () => {
            this.value += '\t';
            this.printText(this.value);
          });

          break;

        case 'delete':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Del';

          keyEl.addEventListener('click', () => {
            const textarea = document.getElementById('textarea');
            const cursorPos = textarea.selectionStart;
            this.value = this.value
              .substring(0, cursorPos)
            + this.value
              .substring(cursorPos + 1, this.value.length);
            textarea.innerHTML = this.value;
            textarea.focus();
            textarea.selectionStart = cursorPos;
          });

          break;

        case 'capsLock':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'CapsLock';

          keyEl.addEventListener('click', () => {
            keyEl.classList.toggle('pushed');
            this.toggleCaps();
          });

          break;

        case 'enter':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'Enter';

          keyEl.addEventListener('click', () => {
            this.value += '\n';
            this.printText(this.value);
          });

          break;

        case 'shift':
          keyEl.classList.add('keybtn__wide', 'shift-key');
          keyEl.innerHTML = 'Shift';

          break;

        case 'space':
          keyEl.classList.add('keybtn__superwide');

          keyEl.addEventListener('click', () => {
            this.value += ' ';
            this.printText(this.value);
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
          keyEl.textContent = key;
          keyEl.classList.add('keybtn__letter');

          keyEl.addEventListener('click', () => {
            this.value += this.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this.printText(this.value);
          });
      }

      keyEl.addEventListener('click', () => {
        keyEl.classList.add('active');
        setTimeout(() => {
          keyEl.classList.remove('active');
        }, 300);
      });

      fragment.appendChild(keyEl);
    });

    return fragment;
  }

  printText(printValue) {
    this.textarea = document.getElementById('textarea');
    this.textarea.innerHTML = printValue;
    this.textarea.focus();
    this.textarea.selectionStart = this.textarea.value.length;
  }

  toggleCaps() {
    this.capsLock = !this.capsLock;

    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  }

  addKeysFunctions() {
    document.addEventListener('keydown', (e) => {
      const key = document.querySelector(`.keybtn[id="${e.code}"]`);
      if (key) {
        e.preventDefault();
        console.log(key.textContent);
        key.classList.add('active');
        if (key.classList.contains('keybtn__letter')) {
          this.value += this.capsLock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
          this.printText(this.value);
        } else if (e.key === 'CapsLock' && !e.repeat) {
          this.toggleCaps();
          key.classList.toggle('pushed');
        } else if (e.key === 'Backspace') {
          this.value = this.value
            .substring(0, this.value.length - 1);
          this.printText(this.value);
        } else if (e.key === 'Tab') {
          this.value += '\t';
          this.printText(this.value);
        } else if (e.key === 'Delete') {
          const textarea = document.getElementById('textarea');
          const cursorPos = textarea.selectionStart;
          this.value = this.value
            .substring(0, cursorPos)
              + this.value
                .substring(cursorPos + 1, this.value.length);
          textarea.innerHTML = this.value;
          textarea.focus();
          textarea.selectionStart = cursorPos;
        } else if (e.key === 'Enter') {
          this.value += '\n';
          this.printText(this.value);
        } else if (e.key === ' ') {
          this.value += ' ';
          this.printText(this.value);
        } else if (e.key === 'Shift' && !e.repeat) {
          this.capsLock = !this.capsLock;
          this.shiftLayout();
        } else if (e.ctrlKey && e.altKey) {
          this.changeLanguage();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      const key = document.querySelector(`.keybtn[id="${e.code}"]`);
      if (key) {
        key.classList.remove('active');
        if (e.key === 'Shift' && !e.repeat) {
          this.capsLock = !this.capsLock;
          this.unShiftLayout();
        }
      }
    });

    document.addEventListener('mousedown', (e) => {
      if (e.target.classList.value === 'keybtn keybtn__wide shift-key') {
        e.target.classList.add('active');
        this.shiftLayout();
        this.capsLock = !this.capsLock;
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (e.target.classList.value === 'keybtn keybtn__wide shift-key') {
        e.target.classList.add('remove');
        this.capsLock = !this.capsLock;
        this.unShiftLayout();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
  keyboard.addKeysFunctions();
});
