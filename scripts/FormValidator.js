export class FormValidator {
    constructor(validationSelectors, formType) {
        this._form = validationSelectors.form;
        this._inputErrorActive = validationSelectors.inputErrorActive;
        this._popupError = validationSelectors.popupError;
        this._button = validationSelectors.button;
        this._buttonInvalid = validationSelectors.buttonInvalid;
        this._inputError = validationSelectors.inputError;
        this._popupItem = validationSelectors.popupItem;
        this._formType = formType
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
        const button = form.querySelector(this._button);
        const isValid = form.checkValidity();

        if(isValid) {
            button.removeAttribute('disabled');
            button.classList.remove(this._buttonInvalid)
        } else {
            button.setAttribute('disabled', true);
            button.classList.add(this._buttonInvalid)
        }
    }

    hideErrorMessages = () => {
        const formList = Array.from(document.querySelectorAll(this._form));

        formList.forEach((form) => {
            const input = form.querySelectorAll(this._popupItem);
            const inputArray = Array.from(input);
            inputArray.forEach((formInput) => {
                formInput.classList.remove(this._popupError)
            })

            const formError = form.querySelectorAll(this._inputError);
            const formErrorArray = Array.from(formError);
            formErrorArray.forEach((error) => {
                error.classList.remove(this._inputErrorActive)
            })
        })
    }

    enableValidation = () => {
        this._formType.addEventListener('input', this._handleFormInput)
    }
}