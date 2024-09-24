import {describe, expect, test} from "@jest/globals";

import IoC from "../../dist/simple-ioc.js";

import NumberA from "../imports/transient/number-a.js";
import NumberB from "../imports/transient/number-b.js";

describe( "Transient tests", () => {
    test( "NumberA increments and NumberB has default value", () => {
        const numberA = IoC.get( NumberA );
        const numberB = IoC.get( NumberB );

        numberA.modify();

        expect( numberA.number ).toBe( 5 );
        expect( numberB.number ).toBe( 0 );
    } );

    test( "NumberB decrements and NumberA has default value", () => {
        const numberA = IoC.get( NumberA );
        const numberB = IoC.get( NumberB );

        numberB.modify();

        expect( numberA.number ).toBe( 0 );
        expect( numberB.number ).toBe( -5 );
    } );
} );