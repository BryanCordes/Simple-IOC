class Service {
    #definition;
    #type;
    #dependencies;

    get definition() {
        return this.#definition;
    }

    get type() {
        return this.#type;
    }

    get dependencies() {
        return this.#dependencies;
    }

    constructor(definition, type, dependencies) {
        this.#definition = definition;
        this.#type = type;
        this.#dependencies = dependencies;
    }
}

export default Service;