import IoC from "../../../dist/simple-ioc.js";
import NumberA from "./number-a.js";
import NumberB from "./number-b.js";
import NumberC from "./number-c.js";
import NumberD from "./number-d.js";

IoC.default.register.asCollection( "numbers", NumberA );
IoC.default.register.asCollection( "numbers", NumberB );
IoC.default.register.asCollection( "numbers", NumberC );
IoC.default.register.asCollection( "numbers", NumberD );