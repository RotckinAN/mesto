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

// общая функция запуска кнопки при открытии попапа
function activateButton(popup, config) {
    const button = popup.querySelector(config.button);
    button.removeAttribute("disabled");
    button.classList.remove(config.buttonInvalid);
}

// общая функция отключения кнопки при открытии попапа
function deactivateButton(popup, config) {
    const button = popup.querySelector(config.button);
    button.setAttribute("disabled", true);
    button.classList.add(config.buttonInvalid);
}

// Создание экземпляра данных попапа редактирования профиля
const userInfoForPopup = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle
});

// Создание экземпляра попапа редактирования профиля
const editPopup = new PopupWithForm(popupElementEdit,
    (inputValue) => {
        userInfoForPopup.setUserInfo(inputValue);
    });

// слушатель событий попапа редактирования профиля
popupEditOpenButtonElement.addEventListener("click", () => {
    editPopup.open();
    const {name, about} = userInfoForPopup.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
    activateButton(popupElementEdit, selectors);
    formEditProfileValidity.hideErrorMessages();
});

//создание открытия фото на весь экран
const photoFullSizeElement = new PopupWithImage(photoFullSize);
photoFullSizeElement.setEventListeners();

// создание первоначальных фотокарточек
const initialCards = new Section({
    data: cards,
    renderer: (card) => {
        const photoCard = new Card({
            data: card,
            handleCardClick: (item) =>{
                photoFullSizeElement.open(item)
            }}, selectors.template);
        initialCards.addItem(photoCard.generateCard())
    }
}, elementsList);

// Создание экземпляра попапа добавления фото
const addImagePopup = new PopupWithForm(popupElementAdd,
    (newArrayPhoto) => {
        const newCard = new Section({
            data: newArrayPhoto,
            renderer: (card) => {
                const newCardAdd = new Card({
                    data: card,
                    handleCardClick: (item) => {
                        photoFullSizeElement.open(item)
                    }},selectors.template);
                newCard.addItem(newCardAdd.generateCard())
            }
        }, elementsList);
        newCard.renderNewItem();
    });

// слушатель событий попапа добавления фото
popupAddOpenButtonElement.addEventListener("click", () => {
    addImagePopup.open();
    deactivateButton(popupElementAdd, selectors);
    formAddPhotoValidity.hideErrorMessages();
});

// запуск методов на установку слушателей событий и на отрисовку фотокарточек
editPopup.setEventListeners();
addImagePopup.setEventListeners();
initialCards.renderItems();

// валидация формы редактированяи профиля
const formEditProfileSubmitButton = formElementEdit.querySelector(selectors.button);
const formEditProfileValidity = new FormValidator(selectors, formElementEdit, formEditProfileSubmitButton);
formEditProfileValidity.enableValidation();


// валадиция формы добавления новых фото
const formAddPhotoSubmitButton = formElementAdd.querySelector(selectors.button);
const formAddPhotoValidity = new FormValidator(selectors, formElementAdd, formAddPhotoSubmitButton);
formAddPhotoValidity.enableValidation();