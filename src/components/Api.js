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
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getRequestData())
    }

    patchProfileInfo(profileInfo) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(profileInfo)
        })
            .then(this._getRequestData())
    }

    postNewPhoto(newPhoto) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(newPhoto)
        })
            .then(this._getRequestData())
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._getRequestData())
    }

    putLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._getRequestData())
    }

    deleteLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._getRequestData())
    }

    patchProfileAvatar(newAvatar) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(newAvatar)
        })
            .then(this._getRequestData())
    }
}