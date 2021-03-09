import create from './utils/create';

export default class MainPage {
  constructor(cardsList) {
    this.cardsList = cardsList;
    this.pageContainer = create('div', 'page-container');
    this.categoryName = create('h2', '', this.pageContainer);
    this.cardsContainer = create('div', 'cards-container', this.pageContainer);
    this.categoryName.innerHTML = 'Choose the category';
    this.createCards();
  }

  createCards() {
    this.cardsList.forEach((elem) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card-container');
      cardElement.innerHTML = `<a href=#${encodeURI(elem.categoryName).toLowerCase()} class="maincard">
                                  <img src="${elem.categoryImage}" alt="${elem.categoryName}">
                                  <span>${elem.categoryName}</span>
                              </a>`;
      this.cardsContainer.appendChild(cardElement);
    });
  }
}
