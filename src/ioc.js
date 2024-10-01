import Container from "./container.js";

class IoC {
    static #container = new Container();

    static get default() {
        return this.#container;
    }

    static getContainerInstance() {
        return new Container();
    }
}

export default IoC;