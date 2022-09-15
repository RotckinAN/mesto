import './index.css';

import {
    selectors,
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
    photoFullSize,
    profileAvatar,
    popupDeleteConfirm,
    popupAvatar,
    editAvatarButton,
    formElementAvatarEdit,
} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import {renderLoading} from "../utils/utils.js";

//Создание экземпляра класса API
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-50/',
    headers: {
        authorization: 'd9722592-b388-4281-b273-bb490f84d549',
        'Content-type': 'application/json'
    }
});

let userId = null;

// Создание экземпляра данных попапа редактирования профиля
const userInfoForPopup = new UserInfo({
    userNameSelector: profileTitle,
    userInfoSelector: profileSubtitle
});

//получение данных пользователя с сервера
const userInfoByRequest = api.getUserInfoByRequest();
userInfoByRequest.then((data) => {
    userId = data._id;
    userInfoForPopup.setUserInfo(data);
    profileAvatar.src = data.avatar;
})
    .catch((err) => {
        console.error(err)
    })

// Создание экземпляра попапа редактирования профиля
const popupProfile = new PopupWithForm(popupElementEdit,
    (inputValue) => {
        renderLoading(true, popupElementEdit, 'Сохранить', 'Сохранение...');
    const patchUserInfo = api.patchProfileInfo(inputValue);

    patchUserInfo.then((userData) => {
        userInfoForPopup.setUserInfo(userData);
        popupProfile.close()
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            renderLoading(false, popupElementEdit, 'Сохранить', 'Сохранение...')
        })
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

// создание экземпляра попапа для подтверждения удаления фогокарточки
let cardID = "";
let cardActualToDelete;
const popupWithSubmit = new PopupWithSubmit(popupDeleteConfirm, () => {
    const deleteCard = api.deleteCard(cardID);
    deleteCard.then(() => {
        cardActualToDelete.remove();
        cardActualToDelete = '';
        popupWithSubmit.close()
    })
        .catch((err) => {
            console.error(err)
        })
});
popupWithSubmit.setEventListeners();

// функция создания экземпляра фотокарточки
const createCard = (card) => {
    const photoCard = new Card({
        data: card,
        handleCardClick: (item) => {
            photoFullSizeElement.open(item)
        },
        handleLikeClick: (card, actualCardId) => {
            if (card.querySelector(selectors.buttonLike).classList.contains(selectors.buttonLikeActive)) {
                card.querySelector(selectors.buttonLike).classList.toggle(selectors.buttonLikeActive);
                const deactivatedLike = api.deleteLike(actualCardId);
                deactivatedLike.then((res) => {
                    photoCard.getNumbersOfLikes(res.likes.length);
                })
                .catch((err) => {
                    console.error(err)
                })
            } else {
                card.querySelector(selectors.buttonLike).classList.toggle(selectors.buttonLikeActive);
                const activatedLike = api.putLike(actualCardId);
                activatedLike.then((res) => {
                    photoCard.getNumbersOfLikes(res.likes.length);
                })
                .catch((err) => {
                    console.error(err)
                })
            }
        },
        handleDeleteIconClick: (actualCardId, actualCard) => {
            cardID = actualCardId;
            cardActualToDelete = actualCard;

            popupWithSubmit.open();
        },
        getUserId: () => {
            return userId;
        },
    }, selectors.template);
    return photoCard.generateCard();
}

// создание экземпляра добавления карточки в разметку
const cardsContainer = new Section({
    renderer: (cardItem) => {
        cardsContainer.addItem(createCard(cardItem))
    }
}, elementsList);

// создание первоначальных фотокарточек
const initialCards = api.getInitialCards();
Promise.all([userInfoByRequest, initialCards])
    .then(([userData, cardData]) => {
        cardData.reverse();
        cardsContainer.renderItems(cardData)
    })
    .catch((err) => {
        console.error(err)
    })

// Создание экземпляра попапа добавления фото
const popupImage = new PopupWithForm(popupElementAdd,
    (newInputDataPhoto) => {
        renderLoading(true, popupElementAdd, 'Создать', 'Создание...');
        const newPhoto = api.postNewPhoto(newInputDataPhoto);
        newPhoto.then((photoRes) => {
            const newCard = createCard(photoRes);
            cardsContainer.addItem(newCard);
            popupImage.close()
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            renderLoading(false, popupElementAdd, 'Создать', 'Создание...')
        })
    });

// слушатель событий попапа добавления фото
popupAddOpenButtonElement.addEventListener("click", () => {
    popupImage.open();
    formAddPhotoValidity.setSubmitButtonState();
    formAddPhotoValidity.hideErrorMessages();
});

// создание экземпляра попапа редактирования аватара профиля
const popupProfileAvatar = new PopupWithForm(popupAvatar,
    (newInputDataAvatar) => {
        renderLoading(true, popupAvatar, 'Сохранить', 'Сохранение...');
        const newAvatar = api.patchProfileAvatar(newInputDataAvatar);
        newAvatar.then((avatarRes) => {
            profileAvatar.src = avatarRes.avatar
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            renderLoading(false, popupAvatar, 'Сохранить', 'Сохранение...')
        })
});

// слушатель события попапа редактирования аватара профиля
editAvatarButton.addEventListener('click', () => {
    popupProfileAvatar.open();
    formEditProfileAvatarValidity.setSubmitButtonState();
    formEditProfileAvatarValidity.hideErrorMessages()
})

// запуск методов на установку слушателей событий и на отрисовку фотокарточек
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupProfileAvatar.setEventListeners();

// валидация формы редактированяи профиля
const formEditProfileSubmitButton = formElementEdit.querySelector(selectors.button);
const formEditProfileValidity = new FormValidator(selectors, formElementEdit, formEditProfileSubmitButton);
formEditProfileValidity.enableValidation();

// валадиция формы добавления новых фото
const formAddPhotoSubmitButton = formElementAdd.querySelector(selectors.button);
const formAddPhotoValidity = new FormValidator(selectors, formElementAdd, formAddPhotoSubmitButton);
formAddPhotoValidity.enableValidation();

// валидация формы изменения аватара профиля
const formEditProfileButton = formElementAvatarEdit.querySelector(selectors.button);
const formEditProfileAvatarValidity = new FormValidator(selectors, formElementAvatarEdit, formEditProfileButton);
formEditProfileAvatarValidity.enableValidation();