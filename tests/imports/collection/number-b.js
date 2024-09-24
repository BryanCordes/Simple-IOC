class NumberB {
    #number;

    modify(value) {
        this.#number = value + 2;
    }

    get number() {
        return this.#number;
    }

    constructor() {
        this.#number = 0;
    }
}

export default NumberB;