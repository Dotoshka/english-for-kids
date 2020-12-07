import create from './utils/create';

export default class Card {
  constructor(cardObject) {
    this.cardObject = cardObject;
    this.createCard();
    this.createCardEvent();
  }

  createCard() {
    const card = this.cardObject;
    this.cardContainer = create('div', 'card-container');
    this.flipCard = create('div', 'flipcard', this.cardContainer);
    this.flipCard.innerHTML = `<div class="flipcard_face front">
                                  <div class="flipcard_image">
                                    <img src=${card.image} alt=${card.word} />
                                  </div>
                                  <div class="flipcard_title">
                                    <p>${card.word}</p>
                                  </div>
                                </div>
                                <div class="flipcard_face back">
                                  <div class="flipcard_image">
                                    <img src=${card.image} alt=${card.word} />
                                  </div>
                                  <div class="flipcard_title">
                                    <p>${card.translation}</p>
                                  </div>
                                </div>`;
    this.flipButton = create('div', 'flip_icon', this.flipCard);
    this.flipButton.innerHTML = '<img src="./assets/images/icons/flip_icon.svg" alt="flip"/>';
    this.flipButton.addEventListener('click', (event) => this.flip(event, true));
    this.flipCard.addEventListener('mouseleave', (event) => this.flip(event, false));
  }

  flip(event, value) {
    event.stopPropagation();
    if (value) {
      this.flipCard.classList.add('card-flipped');
    } else {
      this.flipCard.classList.remove('card-flipped');
    }
  }

  createCardEvent() {
    const cardClickEvent = new CustomEvent('card-click', {
      detail: this.cardObject,
      bubbles: true,
      composed: true,
    });
    this.flipCard.addEventListener('click', (event) => {
      event.preventDefault();
      this.flipCard.dispatchEvent(cardClickEvent);
    });
  }
}
