import Container from "./container.js";

class IoC {
    static #container = new Container();

    static get register() {
        return {
            asTransient: this.#container.register.asTransient,
            asSingleton: this.#container.register.asSingleton,
            asCollection: this.#container.register.asCollection
        }
    }

    static get(definition) {
        return this.#container.get( definition );
    }
}

export default IoC;