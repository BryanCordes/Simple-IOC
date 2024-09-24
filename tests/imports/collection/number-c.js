class NumberC {
    #number;

    modify(value) {
        this.#number = value + 7;
    }

    get number() {
        return this.#number;
    }

    constructor() {
        this.#number = 0;
    }
}

export default NumberC;