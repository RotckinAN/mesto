// функция ожидания запроса (спиннир)
import {selectors} from "./constants.js";

export const renderLoading = (isLoading, popupSelector, submitText, submitTextLoading) => {
    if (isLoading) {
        popupSelector.querySelector(selectors.button).textContent = submitTextLoading
    } else {
        popupSelector.querySelector(selectors.button).textContent = submitText
    }
}