import {describe, expect, test} from "@jest/globals";

import IoC from "../../dist/simple-ioc.js";

import NumberA from "../imports/singleton/number-a.js";
import NumberB from "../imports/singleton/number-b.js";

describe( "Singleton tests", () => {
    test( "NumberA increments and NumberB has same value", () => {
        const numberA = IoC.default.get( NumberA );
        const numberB = IoC.default.get( NumberB );

        numberA.modify();

        expect( numberA.number ).toBe( 5 );
        expect( numberB.number ).toBe( 5 );
    } );

    test( "NumberB decrements and NumberA has same value", () => {
        const numberA = IoC.default.get( NumberA );
        const numberB = IoC.default.get( NumberB );

        // value should be retained from last test
        // this is because IoC methods are static
        expect( numberA.number ).toBe( 5 );

        numberB.modify();

        expect( numberA.number ).toBe( 0 );
        expect( numberB.number ).toBe( 0 );
    } );
} );