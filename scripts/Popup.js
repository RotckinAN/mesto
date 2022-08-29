import {selectors} from "./constants.js";

export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add(selectors.openedPopup);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove(selectors.openedPopup);
        document.removeEventListener('keydown', this._handleEscClose)
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(selectors.openedPopup)) {
                this.close();
            }
            if (evt.target.classList.contains(selectors.popupClose)) {
                this.close()
            }
        })
    }
}