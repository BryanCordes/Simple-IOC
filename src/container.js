import Service from "./includes/service.js";

import {log} from "console";

class Container {
    #services;

    #collection;
    #singleton;

    #getActions;

    #uuid;

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

    get uuid() {
        return this.#uuid;
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
            log( `Adding to collection: ${name}` );

            this.#collection.get( name ).push( service );
        } else {
            log( `Creating collection: ${name}` );

            this.#collection.set( name, [service] );
        }

        log( `Uuid: ${this.uuid}` );
    }

    #getCollection = (name) => {
        log( `Uuid: ${this.uuid}` );

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

    #generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    constructor() {
        this.#services = new Map();
        this.#collection = new Map();
        this.#singleton = new Map();

        this.#uuid = this.#generateUUID();

        this.#getActions = new Map( [
            [Container.type.singleton, this.#getSingleton],
            [Container.type.transient, this.#getTransient]
        ] );
    }
}

export default Container;