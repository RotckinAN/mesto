import {selectors} from '../utils/constants.js';

export class Card {
    constructor({data, handleCardClick}, templateSelector) {
        this._name = data.pictureTitle;
        this._link = data.pictureLink;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector(selectors.elementsItem).cloneNode(true)
    }

    _activateLikeButton() {
        this._element.querySelector(selectors.buttonLike).classList.toggle(selectors.buttonLikeActive)
    }

    _removePhotoCard() {
        this._element.remove();
        this._element = ''
    }

    generateCard() {
        this._photo = this._element.querySelector(selectors.elementPhoto);
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._element.querySelector(selectors.elementPhotoTitle).textContent = this._name;

        this._element.querySelector(selectors.buttonLike).addEventListener('click', () => {this._activateLikeButton()});
        this._element.querySelector(selectors.buttonRemove).addEventListener('click', () => {this._removePhotoCard()});
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._photo)
        })

        return this._element;
    }
}