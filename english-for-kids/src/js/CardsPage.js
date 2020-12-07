import Card from './Card';
import create from './utils/create';
import shuffle from './utils/shuffle';

const rightAnswerSoundPath = './assets/sounds/correct.mp3';
const wrongAnswerSoundPath = './assets/sounds/error.mp3';
const winSoundPath = './assets/sounds/success.mp3';
const loseSoundPath = './assets/sounds/failure.mp3';
const winImagePath = './assets/images/success.png';
const loseImagePath = './assets/images/failure.png';

export default class CardsPage {
  constructor(cardsList) {
    this.cardsList = cardsList;
    this.pageContainer = create('div', 'page-container');
    this.categoryName = create('h2', '', this.pageContainer);
    this.starsContainer = create('div', 'stars', this.pageContainer);
    this.cardsContainer = create('div', 'cards-container', this.pageContainer);
    this.categoryName.innerHTML = `${this.cardsList.categoryName}`;
    this.createCards();
    this.createButtons();
    this.pageAudio = create('audio', `${cardsList.categoryName}`, document.body);
    this.pageContainer.addEventListener('card-click', (event) => this.cardClicksHandler(event));
    this.gameStarted = false;
    window.addEventListener('mode-change', (event) => {
      this.playMode = event.detail;
      this.gameButton.classList.toggle('active');
      this.starsContainer.classList.toggle('active');
      this.finishGame();
    });
  }

  createCards() {
    this.cardElements = [];
    this.cardsList.words.forEach((elem) => {
      const card = new Card(elem);
      this.cardElements.push(card);
      this.cardsContainer.appendChild(card.cardContainer);
    });
  }

  createButtons() {
    this.gameButton = create('button', 'game-button', this.pageContainer);
    this.gameButton.addEventListener('click', this.startGame);
  }

  cardClicksHandler(event) {
    if (!this.playMode && !event.detail.flipCard.classList.contains('card-flipped')) {
      this.pageAudio.src = event.detail.cardObject.audioSrc;
      this.pageAudio.currentTime = 0;
      this.pageAudio.play();
    } else if (this.gameStarted) {
      if (this.currWord.word === event.detail.cardObject.word) {
        create('div', 'star-win', this.starsContainer);
        event.target.classList.add('inactive');
        this.playAudio(rightAnswerSoundPath);
        this.playNext();
      } else {
        this.wrongClicks++;
        create('div', 'star', this.starsContainer);
        this.playAudio(wrongAnswerSoundPath);
      }
    }
  }

  startGame = () => {
    if (this.gameStarted === false) {
      this.wrongClicks = 0;
      this.wordsArr = shuffle([...this.cardsList.words]);
      this.playNext();
      this.gameStarted = true;
      this.gameButton.classList.add('repeat');
    } else {
      if (!this.currWord) return;
      this.playAudio(this.currWord.audioSrc);
    }
  }

  playNext = () => {
    if (this.wordsArr.length !== 0) {
      this.currWord = this.wordsArr.pop();
      setTimeout(() => {
        this.playAudio(this.currWord.audioSrc);
      }, 700);
    } else {
      this.finishGame();
      this.checkWin();
    }
  }

  playAudio(path) {
    this.pageAudio.src = path;
    this.pageAudio.currentTime = 0;
    this.pageAudio.play();
  }

  checkWin() {
    if (this.wrongClicks) {
      this.wrongClicks = 0;
      setTimeout(() => {
        this.playAudio(loseSoundPath);
        this.showModal(false);
      }, 500);
    } else {
      setTimeout(() => {
        this.playAudio(winSoundPath);
        this.showModal(true);
      }, 500);
    }
    setTimeout(() => {
      window.location.hash = '';
      this.overlay.remove();
    }, 4000);
  }

  finishGame = () => {
    this.gameStarted = false;
    this.gameButton.classList.remove('repeat');
    this.starsContainer.innerHTML = '';
    this.cardElements.forEach((elem) => elem.flipCard.classList.remove('inactive'));
  }

  showModal(value) {
    this.overlay = create('div', 'overlay active', this.pageContainer);
    const modalWindow = create('div', 'modal', this.overlay);
    if (value) {
      modalWindow.innerHTML = `Congratulations!
                              <img src="${winImagePath}" alt="win">`;
    } else {
      modalWindow.innerHTML = `Try again!
                              <img src="${loseImagePath}" alt="win">`;
    }
  }
}
