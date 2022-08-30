import {Popup} from "./Popup.js";
import {photoFullSizeLink, photoFullSizeTitle} from "../utils/constants.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    open(item) {
        photoFullSizeLink.src = item.src;
        photoFullSizeLink.alt = item.alt;
        photoFullSizeTitle.textContent = item.alt;
        super.open();
    }
}