export const selectors = {
    popup: ".popup",
    popupClose: "popup__close",
    editButton: ".profile__edit-button",
    popupContentEdit: ".popup__content_type_editProfile",
    popupContentAdd: ".popup__content_type_addPicture",
    itemInputName: ".popup__item_input_name",
    itemInputJob: ".popup__item_input_job",
    profTitle: ".profile__title",
    profSubtitle: ".profile__subtitle",
    openedPopup: "popup_opened",
    addButton: ".profile__add-button",
    popupEdit: ".popup_type_editProfile",
    popupAdd: ".popup_type_addPicture",
    template: ".template",
    elementsList: ".elements__list",
    elementsItem: ".elements__item",
    itemPictureName: ".popup__item_input_pictureName",
    inputPicture: ".popup__item_input_picture",
    elementPhoto: ".element__photo",
    elementPhotoTitle: ".element__title",
    buttonRemove: ".element__trash",
    buttonLike: ".element__like",
    buttonLikeActive: "element__like_active",
    photoFullSize: ".popup_type_photo-FullSize",
    photoFullSizeTitle: ".popup__title",
    photoFullSizeElement: ".popup__photoElement",
    form: '.popup__content',
    inputErrorActive: 'popup__input-error_active',
    popupError: 'popup__item_type_error',
    button: '.popup__save-button',
    buttonInvalid: 'popup__save-button_invalid',
    inputError: '.popup__input-error',
    popupItem: '.popup__item'
}

// объявление переменных
export const popupEditOpenButtonElement = document.querySelector(selectors.editButton); // выбираю кнопку редактирования профия
export const popupAddOpenButtonElement = document.querySelector(selectors.addButton); // выбираю кнопку добавления карточек
export const formElementEdit = document.querySelector(selectors.popupContentEdit); // выбираю форму 1-го попапа
export const nameInput = formElementEdit.querySelector(selectors.itemInputName); // выбираю инпут в попапе (имя)
export const jobInput = formElementEdit.querySelector(selectors.itemInputJob); // выбираю инпут в попапе (работа)
export const profileTitle = document.querySelector(selectors.profTitle); // выбираю заголовок на странице (имя)
export const profileSubtitle = document.querySelector(selectors.profSubtitle); //выбираю подзаголовок на странице (работа)
export const popupElementEdit = document.querySelector(selectors.popupEdit); // выбираю 1-й попап
export const popupElementAdd = document.querySelector(selectors.popupAdd); // выбираю 2-й попап
export const formElementAdd = popupElementAdd.querySelector(selectors.popupContentAdd); // выбираю форму 2-го попапа
export const elementsList = document.querySelector(selectors.elementsList);
export const photoFullSize = document.querySelector(selectors.photoFullSize);
export const photoFullSizeTitle = photoFullSize.querySelector(selectors.photoFullSizeTitle);
export const photoFullSizeLink = photoFullSize.querySelector(selectors.photoFullSizeElement);