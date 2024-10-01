import IoC from "../../../dist/simple-ioc.js";

class Singleton {
    #value;

    get value() {
        return this.#value;
    }

    add(num) {
        this.#value += num;
    }

    subtract(num) {
        this.#value -= num;
    }

    constructor() {
        this.#value = 0;
    }
}

IoC.default.register.asSingleton( Singleton, [] );

export default Singleton;