export class Section {
    constructor({data, renderer}, insertionPoint) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = insertionPoint
    }

    addItem(item) {
        this._container.prepend(item)
    }

    renderItems() {
        this._renderedItems.forEach((card) => {
            this._renderer(card)
        });
    }

    renderNewItem() {
        this._renderer(this._renderedItems)
    }
}