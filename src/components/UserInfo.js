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

    setUserInfo({name, about}) {
        if (name) {
            this._userNameSelector.textContent = name
        }
        if (about) {
            this._userInfoSelector.textContent = about
        }
    }
}