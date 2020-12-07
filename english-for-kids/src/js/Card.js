export default class Card {
  constructor(cardObject) {
    this.cardObject = cardObject;
    this.createCard();
    this.createCardEvent();
  }

  createCard() {
    const card = this.cardObject;
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('card-container');
    this.flipCard = document.createElement('div');
    this.flipCard.classList.add('flipcard');
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
    this.flipButton = document.createElement('div');
    this.flipButton.classList.add('flip_icon');
    this.flipButton.innerHTML = '<img src="./assets/images/icons/flip_icon.svg" alt="flip"/>';
    this.flipCard.append(this.flipButton);
    this.cardContainer.append(this.flipCard);
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
