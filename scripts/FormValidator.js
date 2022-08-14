export class FormValidator {
    constructor(validationSelectors, formType, submitButton) {
        this._inputErrorActive = validationSelectors.inputErrorActive;
        this._popupError = validationSelectors.popupError;
        this._buttonInvalid = validationSelectors.buttonInvalid;
        this._inputError = validationSelectors.inputError;
        this._popupItem = validationSelectors.popupItem;
        this._formType = formType;
        this._submitButton = submitButton
    }

    _handleFormInput = (evt) => {
        const form = evt.currentTarget;

        this._showFieldError(evt, form);
        this._setSubmitButtonState(form)
    }

    _showFieldError = (evt, form) => {
        const input = evt.target;
        const isValid = input.validity.valid;
        const formError = form.querySelector(`.${input.id}-error`);

        if (!isValid) {
            formError.classList.add(this._inputErrorActive);
            formError.textContent = input.validationMessage;
            input.classList.add(this._popupError)
        } else {
            formError.classList.remove(this._inputErrorActive);
            input.classList.remove(this._popupError)
        }
    }

    _setSubmitButtonState = (form) => {
        const isValid = form.checkValidity();

        if(isValid) {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._buttonInvalid)
        } else {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._buttonInvalid)
        }
    }

    hideErrorMessages = () => {
        const inputArray = Array.from(this._formType.querySelectorAll(this._popupItem));
        inputArray.forEach((formInput) => {
            formInput.classList.remove(this._popupError)
        });

        const formErrorArray = Array.from(this._formType.querySelectorAll(this._inputError));
        formErrorArray.forEach((error) => {
            error.classList.remove(this._inputErrorActive)
        })
    }

    enableValidation = () => {
        this._formType.addEventListener('input', this._handleFormInput)
    }
}