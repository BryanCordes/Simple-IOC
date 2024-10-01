import Transient from "./transient.js";
import IoC from "../../../dist/simple-ioc.js";

class NumberA {
    #transient;

    modify() {
        this.#transient.add( 5 );
    }

    get number() {
        return this.#transient.value;
    }

    constructor(singleton) {
        this.#transient = singleton;
    }
}

IoC.default.register.asTransient( NumberA, [ Transient ] );

export default NumberA;