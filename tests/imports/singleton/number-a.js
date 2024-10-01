import Singleton from "./singleton.js";
import IoC from "../../../dist/simple-ioc.js";

class NumberA {
    #singleton;

    modify() {
        this.#singleton.add( 5 );
    }

    get number() {
        return this.#singleton.value;
    }

    constructor(singleton) {
        this.#singleton = singleton;
    }
}

IoC.default.register.asTransient( NumberA, [Singleton] );

export default NumberA;