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

export const photoFullSize = document.querySelector(selectors.photoFullSize);
export const photoFullSizeTitle = photoFullSize.querySelector(selectors.photoFullSizeTitle);
export const photoFullSizeLink = photoFullSize.querySelector(selectors.photoFullSizeElement);

// общая функция открытия попапа
export const openPopup = function (popup) {
    popup.classList.add(selectors.openedPopup);
    document.addEventListener("keydown", handleEscape);
}

// общая функция закрытия попапа
export const closePopup = function (popup) {
    popup.classList.remove(selectors.openedPopup);
    document.removeEventListener("keydown", handleEscape);
}

// общая функция закрытия попапа при нажатии на ESC
export const handleEscape = function (evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(`.${selectors.openedPopup}`);
        closePopup(openedPopup);
    }
}