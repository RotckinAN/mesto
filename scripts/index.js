let popupElement = document.querySelector('.popup');
let popupCloseButtonElement = popupElement.querySelector('.popup__close');
let popupOpenButtonElement = document.querySelector('.profile__edit-button');
let popupSaveButtonElement = popupElement.querySelector('.popup__save-button');

let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__nameInput');
let jobInput = formElement.querySelector('.popup__jobInput');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

const openPopup = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

popupSaveButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);