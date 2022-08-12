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

    photo.addEventListener('click', function() {
        openPhotoFullSize(photo);
    })

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
function openPhotoFullSize(item) {
    openPopup(photoFullSize);
    photoFullSizeLink.src = item.src;
    photoFullSizeLink.alt = item.alt;
    photoFullSizeTitle.textContent = item.alt;
}