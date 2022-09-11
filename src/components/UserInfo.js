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
        this._userNameSelector.textContent = name;
        this._userInfoSelector.textContent = about
    }
}