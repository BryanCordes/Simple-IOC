import IoC from "../../../dist/simple-ioc.js";
import NumberA from "./number-a.js";
import NumberB from "./number-b.js";
import NumberC from "./number-c.js";
import NumberD from "./number-d.js";

IoC.register.asCollection( "numbers", NumberA );
IoC.register.asCollection( "numbers", NumberB );
IoC.register.asCollection( "numbers", NumberC );
IoC.register.asCollection( "numbers", NumberD );