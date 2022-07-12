// селекторы
const selectors = {
    popup: '.popup',
    popupClose: '.popup__close',
    editButton: '.profile__edit-button',
    // popupContent: '.popup__content',
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
    elementsList: '.elements__list'
};

// объявления переменных 
const popupElement = document.querySelector(selectors.popup); // выбираю весь попап
// const popupCloseButtonElement = popupElement.querySelector(selectors.popupClose);  
const popupEditOpenButtonElement = document.querySelector(selectors.editButton);  // выбираю кнопку редактирования профия
const popupAddOpenButtonElement = document.querySelector(selectors.addButton);  // выбираю кнопку добавления карточек

const formElementEdit = document.querySelector(selectors.popupContentEdit);  // выбираю весь 1-й попап 
const nameInput = formElementEdit.querySelector(selectors.itemInputName);  // выбираю инпут в попапе (имя)
const jobInput = formElementEdit.querySelector(selectors.itemInputJob);  // выбираю инпут в попапе (работа)
const profileTitle = document.querySelector(selectors.profTitle);  // выбираю заголовок на странице (имя)
const profileSubtitle = document.querySelector(selectors.profSubtitle);  //выбираю подзаголовок на странице (работа)

// функция открытия 1-го попапа
const popupElementEdit = document.querySelector(selectors.popupEdit);  // выбираю 1-й попап 
const popupCloseButtonElementEdit = popupElementEdit.querySelector(selectors.popupClose);  // выбираю кнопку закрытия попапа
const openEditPopup = function() {
    popupElementEdit.classList.add(selectors.openedPopup);  //добавляю селектор на изменения дисплея (на флекс)
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
const popupElementAdd = document.querySelector(selectors.popupAdd);  // выбираю 2-й попап 

popupAddOpenButtonElement.addEventListener('click', function() {
    popupElementAdd.classList.add(selectors.openedPopup);
});
// const openAddPopup = function() {
//     popupElementAdd.classList.add(selectors.openedPopup);
// }

// // функция закрытия 2-го попапа
const popupCloseButtonElementAdd = popupElementAdd.querySelector(selectors.popupClose); // выбираю кнопку закрытия попапа

popupCloseButtonElementAdd.addEventListener('click', function() {
    popupElementAdd.classList.remove(selectors.openedPopup);
});
// const closeAddPopup = function() {
//     popupElementAdd.classList.remove(selectors.openedPopup);
// };


// логика лайков:
// let elementsItem = document.querySelectorAll('.elements__item');
// elementsItem.querySelector('.element__like').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__like_active');
// });


let cards = [
    {
        name: 'Гаэта',
        link: './images/gaeta.jpg'
    },
    {
        name: 'Лос-Гигантес',
        link: './images/losGigantes.jpg'
    },
    {
        name: 'Миттенвальд',
        link: './images/mittenwald.jpg'
    },
    {
        name: 'Барселона',
        link: './images/barcelona.jpg'
    },
    {
        name: 'Квай',
        link: './images/asia.jpg'
    },
    {
        name: 'Бад-Гойзерн',
        link: './images/badGoisern.jpg'
    },
]

// if('content' in document.createElement(selectors.template)) {
    const elementsList = document.querySelector(selectors.elementsList)
    const template = document.querySelector(selectors.template)

    cards.forEach((info) => {
        const card = template.content.cloneNode(true);

        card.querySelector('img').src = info.link;
        card.querySelector('img').alt = info.name;
        card.querySelector('h2').textContent = info.name;

        elementsList.appendChild(card)
    })
// }