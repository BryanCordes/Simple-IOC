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

class Container {
    #services;

    #collection;
    #singleton;

    #getActions;

    static get type() {
        return {
            singleton: 'singleton',
            transient: 'transient'
        };
    }

    get register() {
        return {
            asTransient: this.#asTransient,
            asSingleton: this.#asSingleton,
            asCollection: this.#asCollection
        }
    }

    get(definitionOrName) {
        if ( typeof definitionOrName === 'string' ) {
            return this.#getCollection( definitionOrName );
        }

        const service = this.#services.get( definitionOrName );
        if ( service ) {
            const getAction = this.#getActions.get( service.type );

            return getAction( definitionOrName, service );
        }

        throw new Error( 'Unable to find service or collection' );
    }

    #asTransient = (definition, dependencies) => {
        this.#setService( definition, Container.type.transient, dependencies );
    }

    #asSingleton = (definition, dependencies) => {
        this.#setService( definition, Container.type.singleton, dependencies );
    }

    #setService = (definition, type, dependencies) => {
        const service = new Service( definition, type, dependencies );

        this.#services.set( definition, service );
    }

    #asCollection = (name, definition, dependencies) => {
        const service = new Service( definition, Container.type.transient, dependencies );

        if ( this.#collection.has( name ) ) {
            this.#collection.get( name ).push( service );
        } else {
            this.#collection.set( name, [service] );
        }
    }

    #getCollection = (name) => {
        const collection = this.#collection.get( name );
        if ( !collection ) {
            return undefined;
        }

        const instances = [];
        for ( const service of collection ) {
            instances.push( this.#createInstance( service ) );
        }

        return instances;
    }

    #getSingleton = (definition, service) => {
        if ( this.#singleton.has( definition ) ) {
            return this.#singleton.get( definition );
        }

        const instance = this.#createInstance( service );

        this.#singleton.set( definition, instance );

        return instance;
    }

    #getTransient = (definition, service) => {
        return this.#createInstance( service );
    }

    #createInstance = (service) => {
        return new service.definition( ...this.#getResolvedDependencies( service ) );
    }

    #getResolvedDependencies = (service) => {
        let dependencies = [];

        if ( service.dependencies ) {
            dependencies = service.dependencies.map( ( deps ) => {
                return this.get( deps );
            });
        }

        return dependencies;
    }

    constructor() {
        this.#services = new Map();
        this.#collection = new Map();
        this.#singleton = new Map();

        this.#getActions = new Map( [
            [Container.type.singleton, this.#getSingleton],
            [Container.type.transient, this.#getTransient]
        ] );
    }
}

class IoC {
    static #container = new Container();

    static get default() {
        return this.#container;
    }

    static getContainerInstance() {
        return new Container();
    }
}

export { IoC as default };
//# sourceMappingURL=simple-ioc.js.map
