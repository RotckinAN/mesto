import {Popup} from "./Popup.js";
import {selectors} from "../utils/constants.js";

export class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this.photoFullSizeLink = popupElement.querySelector(selectors.photoFullSizeElement);
        this.photoFullSizeTitle = popupElement.querySelector(selectors.photoFullSizeTitle)
    }
    open(item) {
        this.photoFullSizeLink.src = item.src;
        this.photoFullSizeLink.alt = item.alt;
        this.photoFullSizeTitle.textContent = item.alt;
        super.open();
    }
}