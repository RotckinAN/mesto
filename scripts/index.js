// селекторы
const selectors = {
    popup: '.popup',
    popupClose: '.popup__close',
    editButton: '.profile__edit-button',
    popupContentEdit: '.popup__content_template_1',
    popupContentAdd: 'popup__content_template_2',
    itemInputName: '.popup__item_input_name',
    itemInputJob: '.popup__item_input_job',
    profTitle: '.profile__title',
    profSubtitle: '.profile__subtitle',
    openedPopup: 'popup_opened',
    addButton: '.profile__add-button',
    popupEdit: '.popup_template_1',
    popupAdd: '.popup_template_2',
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
    photoClose: '.photo-fullSize__close',
    photoFullSize: '.photo-fullSize',
    photoFullSizeOpened: 'photo-fullSize_opened',
    photoFullSizeTitle: '.photo-fullSize__title',
    photoFullSizeElement: '.photo-fullSize__element'
};

// объявления переменных 
const popupElement = document.querySelector(selectors.popup); // выбираю весь попап
const popupEditOpenButtonElement = document.querySelector(selectors.editButton);  // выбираю кнопку редактирования профия
const popupAddOpenButtonElement = document.querySelector(selectors.addButton);  // выбираю кнопку добавления карточек

const formElementEdit = document.querySelector(selectors.popupContentEdit);  // выбираю весь 1-й попап 
const nameInput = formElementEdit.querySelector(selectors.itemInputName);  // выбираю инпут в попапе (имя)
const jobInput = formElementEdit.querySelector(selectors.itemInputJob);  // выбираю инпут в попапе (работа)
const profileTitle = document.querySelector(selectors.profTitle);  // выбираю заголовок на странице (имя)
const profileSubtitle = document.querySelector(selectors.profSubtitle);  //выбираю подзаголовок на странице (работа)

const popupElementEdit = document.querySelector(selectors.popupEdit);  // выбираю 1-й попап 
const popupCloseButtonElementEdit = popupElementEdit.querySelector(selectors.popupClose);  // выбираю кнопку закрытия попапа

const popupElementAdd = document.querySelector(selectors.popupAdd);  // выбираю 2-й попап
const popupCloseButtonElementAdd = popupElementAdd.querySelector(selectors.popupClose); // выбираю кнопку закрытия попапа
const pictureNameInput = popupElementAdd.querySelector(selectors.itemPictureName);  // выбираю инпут в попапе (имя картинки)
const pictureInput = popupElementAdd.querySelector(selectors.inputPicture);  // выбираю инпут в попапе (ссылка на картинку)

const photoFullSize = document.querySelector(selectors.photoFullSize);
const photoCloseButton = photoFullSize.querySelector(selectors.photoClose);
const photoFullSizeTitle = photoFullSize.querySelector(selectors.photoFullSizeTitle);
const photoFullSizeLink = photoFullSize.querySelector(selectors.photoFullSizeElement);

const elementsList = document.querySelector(selectors.elementsList);
const template = document.querySelector(selectors.template);


// функция открытия 1-го попапа
const openEditPopup = function() {
    popupElementEdit.classList.add(selectors.openedPopup);  //добавляю селектор на изменения дисплея
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

// функция закрытия 1-го попапа
const closeEditPopup = function() {
    popupElementEdit.classList.remove(selectors.openedPopup);  //убараю селектор на изменение дисплея
};

// функция сохранения данных 1-го попапа
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeEditPopup();
};

// слушатели
popupEditOpenButtonElement.addEventListener('click', openEditPopup);
popupCloseButtonElementEdit.addEventListener('click', closeEditPopup);
formElementEdit.addEventListener('submit', formSubmitHandler);

// функция открытия 2-го попапа
const openAddPopup = function() {
    popupElementAdd.classList.add(selectors.openedPopup);
    pictureNameInput.value = '';
    pictureInput.value = '';
}

// функция закрытия 2-го попапа
const closeAddPopup = function() {
    popupElementAdd.classList.remove(selectors.openedPopup);
};

// слушатели
popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupCloseButtonElementAdd.addEventListener('click', closeAddPopup);

// функция добавления карточек с фото
function createCard (item) {
        const card = template.content.querySelector(selectors.elementsItem).cloneNode(true);

        card.querySelector(selectors.elementPhoto).src = item.link;
        card.querySelector(selectors.elementPhoto).alt = item.name;
        card.querySelector(selectors.elementPhotoTitle).textContent = item.name;

        card.querySelector(selectors.buttonLike).addEventListener('click', function(evt) {
            evt.target.classList.toggle(selectors.buttonLikeActive)
        });
        card.querySelector(selectors.buttonRemove).addEventListener('click', function(evt) {
            evt.target.parentNode.remove();
        });

        card.querySelector(selectors.elementPhoto).addEventListener('click', openPhotoFullSize)

        elementsList.prepend(card);
    };

// функция открытия фото на всю ширину
function openPhotoFullSize(evt) {
    const cardItem = evt.target.parentNode;
    const photoTitle = cardItem.querySelector(selectors.elementPhotoTitle);
    const linkPhoto = cardItem.querySelector(selectors.elementPhoto);
        
    photoFullSize.classList.add(selectors.photoFullSizeOpened);
    photoFullSizeLink.src = linkPhoto.src;
    photoFullSizeTitle.textContent = photoTitle.textContent;
}

// функция закрытия фото
function closePhotoFullSize() {
    photoFullSize.classList.remove(selectors.photoFullSizeOpened);
}

photoCloseButton.addEventListener('click', closePhotoFullSize);

function addEventListener() {
    popupElementAdd.addEventListener('submit', function(evt) {
    evt.preventDefault();
    // cards.unshift({name: pictureNameInput.value, link: pictureInput.value});
    createCard({name: pictureNameInput.value, link: pictureInput.value});
    closeAddPopup();
    })
}

let cards = [
        {
        name: 'Бад-Гойзерн',
        link: './images/badGoisern.jpg'
    },
    {
        name: 'Квай',
        link: './images/asia.jpg'
    },
    {
        name: 'Барселона',
        link: './images/barcelona.jpg'
    },
    {
        name: 'Миттенвальд',
        link: './images/mittenwald.jpg'
    },
    {
        name: 'Лос-Гигантес',
        link: './images/losGigantes.jpg'
    },
    {
        name: 'Гаэта',
        link: './images/gaeta.jpg'
    },
];

function createInitialCards() {
    cards.forEach(createCard);
};

addEventListener();
createInitialCards();