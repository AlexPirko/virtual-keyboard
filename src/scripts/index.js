import '../styles/index.css';

class Keyboard {
  constructor() {
    this.textarea = null;
    this.keysContainer = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
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

  createKeyElements() {
    const fragment = document.createDocumentFragment();
    const engKeyLayout = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'delete',
      'capsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    const ruKeyLayout = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'delete',
      'capsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ];

    const keyLayout = engKeyLayout;

    keyLayout.forEach((key) => {
      const keyEl = document.createElement('button');

      keyEl.classList.add('keybtn');
      keyEl.setAttribute('type', 'button');

      switch (key) {
        case 'backspace':
          keyEl.classList.add('keybtn__extrawide');
          keyEl.textContent = 'Backspace';

          keyEl.addEventListener('click', () => {
            this.value = this.value
              .substring(0, this.value.length - 1);
            document.getElementById('textarea').innerHTML = this.value;
          });

          break;

        case 'tab':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Tab';

          keyEl.addEventListener('click', () => {
            this.value += '\t';
            document.getElementById('textarea').innerHTML = this.value;
          });

          break;

        case 'delete':
          keyEl.classList.add('keybtn__halfwide');
          keyEl.innerHTML = 'Del';

          keyEl.addEventListener('click', () => {
            this.value = this.value
              .substring(0, this.value.length - 1);
            document.getElementById('textarea').innerHTML = this.value;
          });

          break;

        case 'capsLock':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'CapsLock';

          keyEl.addEventListener('click', () => {
            this.toggleCaps();
          });

          break;

        case 'enter':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'Enter';

          keyEl.addEventListener('click', () => {
            this.value += '\n';
            document.getElementById('textarea').innerHTML = this.value;
          });

          break;

        case 'shift':
          keyEl.classList.add('keybtn__wide');
          keyEl.innerHTML = 'Shift';

          break;

        case 'space':
          keyEl.classList.add('keybtn__superwide');

          keyEl.addEventListener('click', () => {
            this.value += ' ';
            document.getElementById('textarea').innerHTML = this.value;
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
          keyEl.classList.add('keybtn__letter');

          keyEl.addEventListener('click', () => {
            this.value += this.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            // let initialValue = document.getElementById('textarea').innerHTML;
            document.getElementById('textarea').innerHTML = this.value;
          });
      }
      fragment.appendChild(keyEl);
    });

    return fragment;
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

  // markEvent() {
  //   document.addEventListener('keydown', function(e) {
  //     const keys = document.querySelectorAll('.keybtn')
  //     for(let i = 0; i < keys.length; i++) {
  //         if(e.key == keys[i].getAttribute('keyname' ) || e.key == keys[i].getAttribute('lowerCaseName')) {
  //             keys[i].classList.add('active')
  //         }
  //         if(e.code == 'Space') {
  //             spaceKey.classList.add('active')
  //         }
  //         if(e.code == 'ShiftLeft') {
  //             shift_right.classList.remove('active')
  //         }
  //         if(e.code == 'ShiftRight') {
  //             shift_left.classList.remove('active')
  //         }
  //         if(e.code == 'CapsLock') {
  //             caps_lock_key.classList.toggle('active');
  //         }
  //     }
  //   })
  // }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
  console.log(keyboard);
});
