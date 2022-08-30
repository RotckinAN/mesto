import {Popup} from "./Popup.js";
import {selectors} from "../utils/constants.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._getForm()
    }

    _getForm() {
        return this._popupSelector.querySelector(selectors.form);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList = Array.from(this._form.querySelectorAll(selectors.popupItem));
        this._inputList.forEach((item) => {
            this._formValues[item.name] = item.value
        });
        return this._formValues
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close()
    }
}