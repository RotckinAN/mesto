import { cards } from './cards.js';
import { selectors, openPopup, closePopup } from './utils.js';

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// объявления переменных
const popupEditOpenButtonElement = document.querySelector(selectors.editButton); // выбираю кнопку редактирования профия
const popupAddOpenButtonElement = document.querySelector(selectors.addButton); // выбираю кнопку добавления карточек

const formElementEdit = document.querySelector(selectors.popupContentEdit); // выбираю форму 1-го попапа
const nameInput = formElementEdit.querySelector(selectors.itemInputName); // выбираю инпут в попапе (имя)
const jobInput = formElementEdit.querySelector(selectors.itemInputJob); // выбираю инпут в попапе (работа)
const profileTitle = document.querySelector(selectors.profTitle); // выбираю заголовок на странице (имя)
const profileSubtitle = document.querySelector(selectors.profSubtitle); //выбираю подзаголовок на странице (работа)

const popupElementEdit = document.querySelector(selectors.popupEdit); // выбираю 1-й попап
const popupElementAdd = document.querySelector(selectors.popupAdd); // выбираю 2-й попап
const formElementAdd = popupElementAdd.querySelector(selectors.popupContentAdd); // выбираю форму 2-го попапа
const pictureNameInput = popupElementAdd.querySelector(selectors.itemPictureName); // выбираю инпут в попапе (имя картинки)
const pictureInput = popupElementAdd.querySelector(selectors.inputPicture); // выбираю инпут в попапе (ссылка на картинку)

const elementsList = document.querySelector(selectors.elementsList);

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

// функция открытия 1-го попапа
const openEditPopup = function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupElementEdit);
  formEditProfileValidity.hideErrorMessages();
  activateButton(popupElementEdit, selectors);
}

// функция сохранения данных 1-го попапа
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupElementEdit);
}

// функция открытия 2-го попапа
const openAddPopup = function () {
  formElementAdd.reset();
  openPopup(popupElementAdd);
  formAddPhotoValidity.hideErrorMessages();
  deactivateButton(popupElementAdd, selectors);
}

// функция слушателей событий закрытия попапов при клике на кнопку или по оверлею
const popups = document.querySelectorAll(selectors.popup);
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains(selectors.openedPopup)) {
      closePopup(popup);
    }
    if (evt.target.classList.contains(selectors.popupClose)) {
      closePopup(popup);
    }
  });
})

// слушатели
popupEditOpenButtonElement.addEventListener("click", openEditPopup);
formElementEdit.addEventListener("submit", handleProfileFormSubmit);
popupAddOpenButtonElement.addEventListener("click", openAddPopup);

// функция создания первоначальных карточек
function createInitialCards() {
  cards.forEach((cardItem) => {
    const photoCard = new Card(cardItem, selectors.template);
    elementsList.prepend(photoCard.generateCard());
  });
}

//функция добавления новых карточек
function addPhoto(evt) {
  evt.preventDefault();

  const newArrayPhoto = {};
  newArrayPhoto.name = pictureNameInput.value;
  newArrayPhoto.link = pictureInput.value;

  const newCard = new Card(newArrayPhoto, selectors.template);
  elementsList.prepend(newCard.generateCard());
  closePopup(popupElementAdd);
}

popupElementAdd.addEventListener('submit', addPhoto);

// валидация формы редактированяи профиля
const formEditProfileSubmitButton = formElementEdit.querySelector(selectors.button);
const formEditProfileValidity = new FormValidator(selectors, formElementEdit, formEditProfileSubmitButton);
formEditProfileValidity.enableValidation();

// валадиция формы добавления новых фото
const formAddPhotoSubmitButton = formElementAdd.querySelector(selectors.button);
const formAddPhotoValidity = new FormValidator(selectors, formElementAdd, formAddPhotoSubmitButton);
formAddPhotoValidity.enableValidation();

createInitialCards()