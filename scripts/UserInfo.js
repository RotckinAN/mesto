import {jobInput, nameInput, profileSubtitle, profileTitle} from "./constants.js";

export class UserInfo {
    constructor({userNameSelector, userInfoSelector}) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector
    }

    getUserInfo() {
        return {
            name: this._userNameSelector.textContent,
            about: this._userInfoSelector.textContent
        }
    }

    setUserInfo({nameForm, jobForm}) {
        this._userNameSelector.textContent = nameForm;
        this._userInfoSelector.textContent = jobForm
    }
}