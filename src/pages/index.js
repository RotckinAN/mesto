import './index.css';

import {cards} from '../utils/cards.js';
import {selectors,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    popupElementEdit,
    formElementAdd,
    popupElementAdd,
    popupEditOpenButtonElement,
    formElementEdit,
    popupAddOpenButtonElement,
    elementsList,
    photoFullSize
} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

// Создание экземпляра данных попапа редактирования профиля
const userInfoForPopup = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle
});

// Создание экземпляра попапа редактирования профиля
const popupProfile = new PopupWithForm(popupElementEdit,
    (inputValue) => {
        userInfoForPopup.setUserInfo(inputValue);
    });

// слушатель событий попапа редактирования профиля
popupEditOpenButtonElement.addEventListener("click", () => {
    popupProfile.open();
    const {name, about} = userInfoForPopup.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
    formEditProfileValidity.setSubmitButtonState();
    formEditProfileValidity.hideErrorMessages();
});

//создание открытия фото на весь экран
const photoFullSizeElement = new PopupWithImage(photoFullSize);
photoFullSizeElement.setEventListeners();

// функция создания экземпляра фотокарточки
const createCard = (card) => {
    const photoCard = new Card({
        data: card,
        handleCardClick: (item) =>{
            photoFullSizeElement.open(item)
        }}, selectors.template);
    return photoCard.generateCard();
}

// создание первоначальных фотокарточек
const cardsContainer = new Section({
    data: cards,
    renderer: (cardItem) => cardsContainer.addItem(createCard(cardItem))
}, elementsList);

// Создание экземпляра попапа добавления фото
const popupImage = new PopupWithForm(popupElementAdd,
    (newArrayPhoto) => {
        const newCard = createCard(newArrayPhoto);
        cardsContainer.addItem(newCard)
    });

// слушатель событий попапа добавления фото
popupAddOpenButtonElement.addEventListener("click", () => {
    popupImage.open();
    formAddPhotoValidity.setSubmitButtonState();
    formAddPhotoValidity.hideErrorMessages();
});

// запуск методов на установку слушателей событий и на отрисовку фотокарточек
popupProfile.setEventListeners();
popupImage.setEventListeners();
cardsContainer.renderItems();

// валидация формы редактированяи профиля
const formEditProfileSubmitButton = formElementEdit.querySelector(selectors.button);
const formEditProfileValidity = new FormValidator(selectors, formElementEdit, formEditProfileSubmitButton);
formEditProfileValidity.enableValidation();


// валадиция формы добавления новых фото
const formAddPhotoSubmitButton = formElementAdd.querySelector(selectors.button);
const formAddPhotoValidity = new FormValidator(selectors, formElementAdd, formAddPhotoSubmitButton);
formAddPhotoValidity.enableValidation();