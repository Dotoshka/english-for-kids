/* eslint-disable no-new */
import cardsData from './cards.json';
import CardsPage from './CardsPage';
import MainPage from './MainPage';
import BurgerMenu from './BurgerMenu';

export default class App {
  constructor() {
    this.mainContainer = document.querySelector('main');
    this.fullCardsList = cardsData;
    this.router = this.createRouter();
    if (window.location.hash === '') {
      this.showPage('#main');
    } else {
      this.showPage(window.location.hash);
    }
    window.addEventListener('hashchange', () => {
      this.showPage(window.location.hash);
    });
    this.switchInput = document.querySelector('.switch-input');
    this.switchInput.addEventListener('change', this.switchMode);
    new BurgerMenu(this.fullCardsList);
  }

  createRouter() {
    const router = {
      main: new MainPage(this.fullCardsList),
      // add stats
    };
    this.fullCardsList.forEach((elem) => {
      router[encodeURI(elem.categoryName).toLowerCase()] = new CardsPage(elem);
    });
    return router;
  }

  showPage(hash) {
    this.mainContainer.innerHTML = '';
    let name = hash.substring(1);
    if (!this.router[name]) {
      name = 'main';
      window.location.hash = '';
    }
    this.mainContainer.append(this.router[name].pageContainer);
  }

  switchMode = () => {
    const switchState = this.switchInput.checked;
    window.dispatchEvent(new CustomEvent('mode-change', {
      detail: switchState,
    }));
    if (switchState) {
      this.mainContainer.classList.add('play-mode');
    } else {
      this.mainContainer.classList.remove('play-mode');
    }
  }

  // getData() {
  //   fetch('./cards.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }
}
