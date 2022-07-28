// селекторы
const selectors = {
    popup: '.popup',
    popupClose: 'popup__close',
    editButton: '.profile__edit-button',
    popupContentEdit: '.popup__content_type_editProfile',
    popupContentAdd: '.popup__content_type_addPicture',
    itemInputName: '.popup__item_input_name',
    itemInputJob: '.popup__item_input_job',
    profTitle: '.profile__title',
    profSubtitle: '.profile__subtitle',
    openedPopup: 'popup_opened',
    addButton: '.profile__add-button',
    popupEdit: '.popup_type_editProfile',
    popupAdd: '.popup_type_addPicture',
    template: '.template',
    elementsList: '.elements__list',
    elementsItem: '.elements__item',
    itemPictureName: '.popup__item_input_pictureName',
    inputPicture: '.popup__item_input_picture',
    elementPhoto: '.element__photo',
    elementPhotoTitle: '.element__title',
    buttonRemove: '.element__trash',
    buttonLike: '.element__like',
    buttonLikeActive: 'element__like_active',
    photoFullSize: '.popup_type_photo-FullSize',
    photoFullSizeTitle: '.popup__title',
    photoFullSizeElement: '.popup__photoElement'
};

// объявления переменных 
const popupEditOpenButtonElement = document.querySelector(selectors.editButton);  // выбираю кнопку редактирования профия
const popupAddOpenButtonElement = document.querySelector(selectors.addButton);  // выбираю кнопку добавления карточек

const formElementEdit = document.querySelector(selectors.popupContentEdit);  // выбираю форму 1-го попапа 
const nameInput = formElementEdit.querySelector(selectors.itemInputName);  // выбираю инпут в попапе (имя)
const jobInput = formElementEdit.querySelector(selectors.itemInputJob);  // выбираю инпут в попапе (работа)
const profileTitle = document.querySelector(selectors.profTitle);  // выбираю заголовок на странице (имя)
const profileSubtitle = document.querySelector(selectors.profSubtitle);  //выбираю подзаголовок на странице (работа)

const popupElementEdit = document.querySelector(selectors.popupEdit);  // выбираю 1-й попап 
const popupElementAdd = document.querySelector(selectors.popupAdd);  // выбираю 2-й попап
const formElementAdd = popupElementAdd.querySelector(selectors.popupContentAdd); // выбираю форму 2-го попапа
const pictureNameInput = popupElementAdd.querySelector(selectors.itemPictureName);  // выбираю инпут в попапе (имя картинки)
const pictureInput = popupElementAdd.querySelector(selectors.inputPicture);  // выбираю инпут в попапе (ссылка на картинку)

const photoFullSize = document.querySelector(selectors.photoFullSize);
const photoFullSizeTitle = photoFullSize.querySelector(selectors.photoFullSizeTitle);
const photoFullSizeLink = photoFullSize.querySelector(selectors.photoFullSizeElement);

const elementsList = document.querySelector(selectors.elementsList);
const template = document.querySelector(selectors.template);

// общая функция открытия попапа
const openPopup = function(popup) {
    popup.classList.add(selectors.openedPopup);
    document.addEventListener('keydown', function (evt) {
        keyHandler(evt, popup);
    });
}

// общая функция закрытия попапа
const closePopup = function(popup) {
    popup.classList.remove(selectors.openedPopup);
    document.removeEventListener('keydown', function (evt) {
        keyHandler(evt, popup)
    });
}

// общая функция закрытия попапа при нажатии на ESC
const keyHandler = function(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup)
    }
}

// функция запуска кнопки при открытии 1-го попапа
function activateButton (config) {
    const button = popupElementEdit.querySelector(config.button);
    button.removeAttribute('disabled');
    button.classList.remove(config.buttonInvalid);
}

// функция отключения кнопки при открытии 2-го попапа
function deactivateButton (config) {
    const button = popupElementAdd.querySelector(config.button);
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonInvalid);
}

// функция открытия 1-го попапа
const openEditPopup = function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupElementEdit);
    hideErrorMessages(popupSelectors);
    activateButton(popupSelectors);
}

// функция сохранения данных 1-го попапа
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupElementEdit);
}

// функция открытия 2-го попапа
const openAddPopup = function() {
    formElementAdd.reset();
    openPopup(popupElementAdd);
    hideErrorMessages(popupSelectors);
    deactivateButton(popupSelectors)
}

// функция слушателей событий закрытия попапов при клике на кнопку или по оверлею
const popups = document.querySelectorAll(selectors.popup)
popups.forEach(function (popup) {
    popup.addEventListener('mousedown', function(evt) {
        if (evt.target.classList.contains(selectors.openedPopup)) {
            closePopup(popup)
        }
        if (evt.target.classList.contains(selectors.popupClose)) {
            closePopup(popup)
        }
    })
})

// слушатели
popupEditOpenButtonElement.addEventListener('click', openEditPopup);
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
popupAddOpenButtonElement.addEventListener('click', openAddPopup);

// функция создания новой карточки
function createCard (item) {
    const card = template.content.querySelector(selectors.elementsItem).cloneNode(true);
    const photo = card.querySelector(selectors.elementPhoto);
    
    photo.src = item.link; //копируется ссылка
    photo.alt = item.name; //копируется имя
    card.querySelector(selectors.elementPhotoTitle).textContent = item.name; //копируется подзаголовок

    card.querySelector(selectors.buttonLike).addEventListener('click', function(evt) { //устанвка лайков
        evt.target.classList.toggle(selectors.buttonLikeActive)
    });
    card.querySelector(selectors.buttonRemove).addEventListener('click', function() { //удаление карточки
        card.remove();
    });

    photo.addEventListener('click', openPhotoFullSize) //открытие в п-й размер

    return card;
}

//функция создания первоначальных карточек
function createInitialCards() {
    cards.forEach(function(card) {
        elementsList.prepend(createCard(card));
    });
}

//функция добавления новых карточек
function addPhoto(evt) {
    evt.preventDefault();

    const newCard = createCard({name: pictureNameInput.value, link: pictureInput.value});
    elementsList.prepend(newCard);
    closePopup(popupElementAdd);
}

popupElementAdd.addEventListener('submit', addPhoto);

// функция открытия фото на всю ширину
function openPhotoFullSize(evt) {
    openPopup(photoFullSize);
    photoFullSizeLink.src = evt.target.src;
    photoFullSizeLink.alt = evt.target.alt;
    photoFullSizeTitle.textContent = evt.target.alt;
}

createInitialCards();