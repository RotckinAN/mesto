// селекторы
const selectors = {
    popup: '.popup',
    popupClose: '.popup__close',
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
const popupElement = document.querySelector(selectors.popup); // выбираю весь попап
const popupEditOpenButtonElement = document.querySelector(selectors.editButton);  // выбираю кнопку редактирования профия
const popupAddOpenButtonElement = document.querySelector(selectors.addButton);  // выбираю кнопку добавления карточек

const formElementEdit = document.querySelector(selectors.popupContentEdit);  // выбираю форму 1-го попапа 
const nameInput = formElementEdit.querySelector(selectors.itemInputName);  // выбираю инпут в попапе (имя)
const jobInput = formElementEdit.querySelector(selectors.itemInputJob);  // выбираю инпут в попапе (работа)
const profileTitle = document.querySelector(selectors.profTitle);  // выбираю заголовок на странице (имя)
const profileSubtitle = document.querySelector(selectors.profSubtitle);  //выбираю подзаголовок на странице (работа)

const popupElementEdit = document.querySelector(selectors.popupEdit);  // выбираю 1-й попап 
const popupCloseButtonElementEdit = popupElementEdit.querySelector(selectors.popupClose);  // выбираю кнопку закрытия попапа

const popupElementAdd = document.querySelector(selectors.popupAdd);  // выбираю 2-й попап
const formElemenAdd = popupElementAdd.querySelector(selectors.popupContentAdd); // выбираю форму 2-го попапа
const popupCloseButtonElementAdd = popupElementAdd.querySelector(selectors.popupClose); // выбираю кнопку закрытия попапа
const pictureNameInput = popupElementAdd.querySelector(selectors.itemPictureName);  // выбираю инпут в попапе (имя картинки)
const pictureInput = popupElementAdd.querySelector(selectors.inputPicture);  // выбираю инпут в попапе (ссылка на картинку)

const photoFullSize = document.querySelector(selectors.photoFullSize);
const photoCloseButton = photoFullSize.querySelector(selectors.popupClose);
const photoFullSizeTitle = photoFullSize.querySelector(selectors.photoFullSizeTitle);
const photoFullSizeLink = photoFullSize.querySelector(selectors.photoFullSizeElement);

const elementsList = document.querySelector(selectors.elementsList);
const template = document.querySelector(selectors.template);

// общая функция открытия попапа
const openPopup = function(popup) {
    popup.classList.add(selectors.openedPopup);
}

// общая функция закрытия попапа
const closePopup = function(popup) {
    popup.classList.remove(selectors.openedPopup);
}

// функция открытия 1-го попапа
const openEditPopup = function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupElementEdit);
}

// функция закрытия 1-го попапа
const closeEditPopup = function() {
    closePopup(popupElementEdit);  //убараю селектор на изменение дисплея
};

// функция сохранения данных 1-го попапа
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeEditPopup();
};

// функция открытия 2-го попапа
const openAddPopup = function() {
    formElemenAdd.reset();
    openPopup(popupElementAdd);
}

// функция закрытия 2-го попапа
const closeAddPopup = function() {
    closePopup(popupElementAdd);
}

// слушатели
popupEditOpenButtonElement.addEventListener('click', openEditPopup);
popupCloseButtonElementEdit.addEventListener('click', closeEditPopup);
formElementEdit.addEventListener('submit', formSubmitHandler);
popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupCloseButtonElementAdd.addEventListener('click', closeAddPopup);

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
    card.querySelector(selectors.buttonRemove).addEventListener('click', function(evt) { //удаление карточки
        evt.target.closest(selectors.elementsItem).remove();
    });

    card.querySelector(selectors.elementPhoto).addEventListener('click', openPhotoFullSize) //открытие в п-й размер

    return card;
};

//функция создания первоначальных карточек
function createInitialCards() {
    cards.forEach(function(card) {
        elementsList.prepend(createCard(card));
    });
};

//функция добавления новых карточек
function addPhoto(evt) {
    evt.preventDefault();

    cards.unshift({name: pictureNameInput.value, link: pictureInput.value});
    const newPhoto = createCard(cards[0]);
    elementsList.prepend(newPhoto);
    closeAddPopup();
}

popupElementAdd.addEventListener('submit', addPhoto);

// функция открытия фото на всю ширину
function openPhotoFullSize(evt) {
    photoFullSize.classList.add(selectors.openedPopup);
    photoFullSizeLink.src = evt.target.src;
    photoFullSizeTitle.textContent = evt.target.alt;
}

// функция закрытия фото
function closePhotoFullSize() {
    photoFullSize.classList.remove(selectors.openedPopup);
}

photoCloseButton.addEventListener('click', closePhotoFullSize);

createInitialCards();