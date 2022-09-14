export class Section {
    constructor({renderer}, insertionPoint) {
        this._renderer = renderer;
        this._container = insertionPoint
    }

    addItem(item) {
        this._container.prepend(item)
    }

    renderItems(card) {
        this._renderer(card)
    }
}