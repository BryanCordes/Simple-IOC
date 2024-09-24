import IoC from "../../../dist/simple-ioc.js";

class Transient {
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

IoC.register.asTransient( Transient, [] );

export default Transient;