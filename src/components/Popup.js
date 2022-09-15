import {selectors} from "../utils/constants.js";

export class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add(selectors.openedPopup);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove(selectors.openedPopup);
        document.removeEventListener('keydown', this._handleEscClose)
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(selectors.openedPopup)) {
                this.close();
            }
            if (evt.target.classList.contains(selectors.popupClose)) {
                this.close()
            }
        })
    }
}