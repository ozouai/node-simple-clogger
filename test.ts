import * as logger from "./app";


logger.enableConsole();

var log = logger.create({ Name: "Main App" });
log("Got Array", { Hello: "World", PI: 3.14 });