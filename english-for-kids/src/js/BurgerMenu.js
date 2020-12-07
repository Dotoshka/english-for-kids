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
  }

  createLinks() {
    this.menuList.innerHTML = '<li><a href="#" class="menu-item">Main page</a></li>';
    this.menuLinks.forEach((elem) => {
      const link = create('li', 'menu-item', this.menuList);
      link.innerHTML = `<a href=#${encodeURI(elem.categoryName).toLowerCase()} class="menu-item">${elem.categoryName}</a>`;
    });
    [...this.menuList.children].forEach((child) => child.addEventListener('click', this.switchMenu));
  }

  switchMenu = () => {
    this.overlay.classList.toggle('active');
    this.menuContainer.classList.toggle('active');
    this.menuLabel.classList.toggle('active');
  }
}
