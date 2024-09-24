class NumberD {
    #number;

    modify(value) {
        this.#number = value + 1;
    }

    get number() {
        return this.#number;
    }

    constructor() {
        this.#number = 0;
    }
}

export default NumberD;