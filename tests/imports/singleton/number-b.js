import Singleton from "./singleton.js";
import IoC from "../../../dist/simple-ioc.js";

class NumberB {
    #singleton;

    modify() {
        this.#singleton.subtract( 5 );
    }

    get number() {
        return this.#singleton.value;
    }

    constructor(singleton) {
        this.#singleton = singleton;
    }
}

IoC.default.register.asTransient( NumberB, [Singleton] );

export default NumberB;