import {Popup} from "./Popup.js";
import {selectors} from "../utils/constants.js";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, callbackSubmit) {
        super(popupSelector);
        this._callbackSubmit = callbackSubmit;
        this._form = this._getForm();
    }

    _getForm() {
        return this._popupSelector.querySelector(selectors.form);
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(evt);
            this.close();
        });
        super.setEventListeners();
    }
}