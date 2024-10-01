import Container from "./container.js";

class IoC {
    static #container = new Container();

    static get default() {
        return {
            get register() {
                return {
                    asTransient: this.#container.register.asTransient,
                    asSingleton: this.#container.register.asSingleton,
                    asCollection: this.#container.register.asCollection
                }
            },
            get: (definition) => {
                return this.#container.get( definition );
            }
        }
    }

    static getContainerInstance() {
        return new Container();
    }
}

export default IoC;