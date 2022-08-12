import {
    selectors,
    photoFullSize,
    photoFullSizeLink,
    photoFullSizeTitle,
    openPopup
    } from './index.js';

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate = () => {
        return document.querySelector(this._templateSelector).content.querySelector(selectors.elementsItem).cloneNode(true)
    }

    _activateLikeButton = () => {
        this._element.querySelector(selectors.buttonLike).classList.toggle(selectors.buttonLikeActive)
    }

    _removePhotoCard = () => {
        this._element.remove()
    }

    _openPhotoFullSize = (item) => {
        openPopup(photoFullSize);
        photoFullSizeLink.src = item.src;
        photoFullSizeLink.alt = item.alt;
        photoFullSizeTitle.textContent = item.alt;
    }

    generateCard = () => {
        this._element = this._getTemplate();
        this._photo = this._element.querySelector(selectors.elementPhoto);
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._element.querySelector(selectors.elementPhotoTitle).textContent = this._name;

        this._element.querySelector(selectors.buttonLike).addEventListener('click', this._activateLikeButton);
        this._element.querySelector(selectors.buttonRemove).addEventListener('click', this._removePhotoCard);
        this._photo.addEventListener('click', () => {
            this._openPhotoFullSize(this._photo)
        })

        return this._element;
    }
}