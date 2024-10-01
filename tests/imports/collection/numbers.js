import IoC from "../../../dist/simple-ioc.js";
import "./number-collection.js";

class Numbers {
    #numbers;

    #number;

    calculate() {
        for ( let number of this.#numbers ) {
            number.modify( this.#number );

            this.#number = number.number;
        }
    }

    get number() {
        return this.#number;
    }

    constructor(numbers) {
        this.#numbers = numbers;

        this.#number = 0;
    }
}

IoC.default.register.asTransient( Numbers, ["numbers"] );

export default Numbers;

