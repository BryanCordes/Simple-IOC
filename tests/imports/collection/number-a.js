class NumberA {
    #number;

    modify(value) {
        this.#number = value + 5;
    }

    get number() {
        return this.#number;
    }

    constructor() {
        this.#number = 0;
    }
}

export default NumberA;