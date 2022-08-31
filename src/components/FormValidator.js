export class FormValidator {
    constructor(validationSelectors, formType, submitButton) {
        this._inputErrorActive = validationSelectors.inputErrorActive;
        this._popupError = validationSelectors.popupError;
        this._buttonInvalid = validationSelectors.buttonInvalid;
        this._inputError = validationSelectors.inputError;
        this._popupItem = validationSelectors.popupItem;
        this._formType = formType;
        this._submitButton = submitButton;
        this._inputArray = Array.from(this._formType.querySelectorAll(this._popupItem));
        this._formErrorArray = Array.from(this._formType.querySelectorAll(this._inputError))
    }

    _handleFormInput(evt) {
        this._showFieldError(evt);
        this.setSubmitButtonState()
    }

    _showFieldError(evt) {
        const input = evt.target;
        const isValid = input.validity.valid;
        const formError = this._formType.querySelector(`.${input.id}-error`);

        if (!isValid) {
            formError.classList.add(this._inputErrorActive);
            formError.textContent = input.validationMessage;
            input.classList.add(this._popupError)
        } else {
            formError.classList.remove(this._inputErrorActive);
            input.classList.remove(this._popupError)
        }
    }

    setSubmitButtonState() {
        const isValid = this._formType.checkValidity();

        if(isValid) {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._buttonInvalid)
        } else {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._buttonInvalid)
        }
    }

    hideErrorMessages() {
        this._inputArray.forEach((formInput) => {
            formInput.classList.remove(this._popupError)
        });

        this._formErrorArray.forEach((error) => {
            error.classList.remove(this._inputErrorActive)
        })
    }

    enableValidation() {
        this._formType.addEventListener('input', (evt) => {
            this._handleFormInput(evt)
        })
    }
}