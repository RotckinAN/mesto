# Проектная работа №4-9. Mesto Russia.

---

Данная проектная работа выполнена на основании изученного ранее материала по HTML, CSS, JavaScript и охватывает весь основной курс верстки, а также основы языка программирования JavaScript. Проект представляет собой одностраничный сайт с интерактивной страницей, куда можно добавлять фотографии, удалять их и ставить лайки. Применены технологии разметки, верстки (в том числе Flexbox, Grid Layout), позиционирования элементов, анимации. Использована технология адаптивной верстки - выполнена адаптация по следующим популярным разрешениям экрана (ширине): 320px, 768px, 1024px и 1280px. Выполнена логика заполнения форм модального окна с помощью JavaScript. Реализована функция построения фото через template-шаблоны, возможность добавления новых фото, их удаления, изменение аватара пользователя. Фотографиям можно ставить лайки (имеется счетчик лайков). Открытие и закрытие модальных окон происходит плавно. Выполнена валидация форм, внесена возможность закрытия попапа при клике по оверлей или нажатием клавиши ESC на клавиатуре. При построении использованы методология БЭМ, пути к файлам и организация файлов по БЭМ.

---
Код объектно-ориентирован. Добавление карточек реализовано при помощи класса Card; открытие попапов - классов PopupWithForm (попапы, имеющие инпуты для заполнения форм) и PopupWithImage (открытие фото на всю ширину экрана), при этом классы выполнены на основе родительского класса Popup; получение информации заголовка - класса UserInfo; валидация форм - класса FormValidator; вставка карточек в разметку - класса Section.

---
Реализована загрузка всех данных с сервера, что дает возможность сохранять все данные и не терять их при перезагрузке страницы.

---
Выполнена сборка проекта при помощи программы-сборщика Webpack. Настроено две сборки - для разработки и для использования.

---
С данной проектной работой можно ознакомиться по следующей ссылке: https://rotckinan.github.io/mesto/index.html
