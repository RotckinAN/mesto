import {selectors} from '../utils/constants.js';

export class Card {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick, getUserId}, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardUserId = data.owner._id;
        this._likesNumber = data.likes.length;
        this._idCard = data._id;
        this._likesId = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._templateSelector = templateSelector;
        this._getUserId = getUserId;
        this._activateDeleteButton = handleDeleteIconClick;
        this._element = this._getTemplate();
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector(selectors.elementsItem).cloneNode(true)
    }

    _hideDeleteButton(card) {
        if (this._getUserId() !== this._cardUserId) {
            card.querySelector(selectors.buttonRemove).classList.add(selectors.hiddenButtonRemove)
        } else {
            card.querySelector(selectors.buttonRemove).classList.remove(selectors.hiddenButtonRemove)
        }
    }

    _getInintialLikesNumber() {
        this._element.querySelector(selectors.likeNumbers).textContent = this._likesNumber;
        this._likesId.forEach((item) => {
            if (item._id === this._getUserId()) {
                this._element.querySelector(selectors.buttonLike).classList.add(selectors.buttonLikeActive)
            }
        })
    }

    getNumbersOfLikes(likesNumbers) {
        this._element.querySelector(selectors.likeNumbers).textContent = likesNumbers;
    }

    generateCard() {
        this._photo = this._element.querySelector(selectors.elementPhoto);
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._element.querySelector(selectors.elementPhotoTitle).textContent = this._name;
        this._hideDeleteButton(this._element);
        this._getInintialLikesNumber();

        this._element.querySelector(selectors.buttonRemove).addEventListener('click', (evt) => {
            this._activateDeleteButton(this._idCard, this._element);
        });
        this._element.querySelector(selectors.buttonLike).addEventListener('click', () => {this._handleLikeClick(this._element, this._idCard)});
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._photo)
        })

        return this._element;
    }
}