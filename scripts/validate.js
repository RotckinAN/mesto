const popupSelectors = {
    form: '.popup__content',
    inputErrorActive: 'popup__input-error_active',
    popupError: 'popup__item_type_error',
    button: '.popup__save-button',
    buttonInvalid: 'popup__save-button_invalid',
    inputError: '.popup__input-error',
    popupItem: '.popup__item'
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.form));
    formList.forEach(function(form) {
        form.addEventListener('input', function (evt) {
            handleFormInput(evt, config);
        })
    });
}

// общая функция событий на попапе
function handleFormInput(evt, config) {
    const form = evt.currentTarget;

    showFieldError(evt, form, config);
    setSubmitButtonState(form, config);
}

// функция текста ошибки при заполнении формы
function showFieldError(evt, form, config) {
    const input = evt.target;
    const isValid = input.validity.valid;
    const formError = form.querySelector(`.${input.id}-error`);

    if (!isValid) {
        formError.classList.add(config.inputErrorActive);
        formError.textContent = input.validationMessage;
        input.classList.add(config.popupError)
    } else {
        formError.classList.remove(config.inputErrorActive);
        input.classList.remove(config.popupError)
    }
}

// функиця активации кнопки сабмита
function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.button);
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(config.buttonInvalid);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(config.buttonInvalid);
    }
}

// функция открытия попапа без ошибки
const hideErrorMessages = function(config) {
    const formList = Array.from(document.querySelectorAll(config.form));

    formList.forEach(function(form) {
        const input = form.querySelectorAll(config.popupItem);
        const inputArray = Array.from(input);
        inputArray.forEach(function(formInput) {
            formInput.classList.remove(config.popupError);
        })

        const formError = form.querySelectorAll(config.inputError);
        const formErrorArray = Array.from(formError);
        formErrorArray.forEach(function(error) {
            error.classList.remove(config.inputErrorActive);
        })
    })
    }

enableValidation(popupSelectors)