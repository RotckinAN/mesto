export class Section {
    constructor({renderer}, insertionPoint) {
        this._renderer = renderer;
        this._container = insertionPoint
    }

    addItem(item) {
        this._container.prepend(item)
    }

    renderItems(cardArray) {
        cardArray.forEach((card) => {
            this._renderer(card)
        })
    }
}