export class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers
    }

    _getRequestData() {
        return (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка, код ошибки: ${res.status}`)
        }
    }

    getUserInfoByRequest() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getRequestData())
            .catch((err) => {
                console.error(err)
            })
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getRequestData())
            .catch((err) => {
                console.error(err)
            })
    }

    patchProfileInfo(profileInfo) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(profileInfo)
        })
            .then(this._getRequestData())
            .catch((err) => {
                console.error(err)
            })
    }
}