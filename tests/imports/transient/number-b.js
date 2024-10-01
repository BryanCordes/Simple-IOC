import Transient from "./transient.js";
import IoC from "../../../dist/simple-ioc.js";

class NumberB {
    #transient;

    modify() {
        this.#transient.subtract( 5 );
    }

    get number() {
        return this.#transient.value;
    }

    constructor(singleton) {
        this.#transient = singleton;
    }
}

IoC.default.register.asTransient( NumberB, [ Transient ] );

export default NumberB;