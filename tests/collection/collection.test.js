import {describe, expect, test} from "@jest/globals";
import IoC from "../../dist/simple-ioc.js";
import Numbers from "../imports/collection/numbers.js";

describe( "Transient tests", () => {
    test( "Numbers calculates to 15", () => {
        const numbers = IoC.default.get( Numbers );

        numbers.calculate();

        expect( numbers.number ).toBe( 15 );
    } );
} );