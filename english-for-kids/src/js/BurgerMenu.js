/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import create from './utils/create';

export default class BurgerMenu {
  constructor(menuLinks) {
    this.menuInput = document.querySelector('.check-menu');
    this.menuLabel = document.querySelector('.menu-label');
    this.overlay = create('div', 'overlay overlay_menu', document.body);
    this.menuLinks = menuLinks;
    this.menuContainer = document.querySelector('.menu');
    this.menuList = create('ul', 'menu-list', this.menuContainer);
    this.createLinks();
    this.menuInput.addEventListener('change', this.switchMenu);
    this.overlay.onclick = this.switchMenu;
    console.log(this.linksList);
    window.addEventListener('hashchange', this.switchActiveLink);
    this.switchActiveLink();
  }

  createLinks() {
    this.linksList = {};
    const mainLink = create('li', 'menu-item', this.menuList);
    mainLink.innerHTML = `<a href="#" class="menu-item">
                          <img src="./assets/images/icons/menu-icons/main.svg" alt="icon">
                          Main page</a>`;
    this.linksList.main = mainLink;
    this.menuLinks.forEach((elem) => {
      const link = create('li', 'menu-item', this.menuList);
      link.innerHTML = `<a href=#${encodeURI(elem.categoryName).toLowerCase()} class="menu-link">
                        <img src="${elem.menuImage}" alt="icon">
                        ${elem.categoryName}
                        </a>`;
      this.linksList[encodeURI(elem.categoryName).toLowerCase()] = link;
      console.log(this.linksList);
    });
    [...this.menuList.children].forEach((child) => child.addEventListener('click', this.switchMenu));
  }

  switchMenu = () => {
    this.overlay.classList.toggle('active');
    this.menuContainer.classList.toggle('active');
    this.menuLabel.classList.toggle('active');
    document.body.classList.toggle('unscroll');
  }

  switchActiveLink = () => {
    console.log(this.linksList);
    for (const key in this.linksList) {
      this.linksList[key].classList.remove('active');
      if (!window.location.hash) {
        this.linksList.main.classList.add('active');
      } else if (key === window.location.hash.substring(1)) {
        this.linksList[key].classList.add('active');
      }
    }
  }
}
