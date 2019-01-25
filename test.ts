import * as logger from "./app";

logger.enableConsole();
logger.setPretty(true);
var log = logger.create({ Name: "Main App" });
log("Got Array", { Hello: "World", PI: 3.14 });
logger.setPretty(false);
var clog = logger.createClassLogger({ Name: "Main App" });
clog.info("Hello", { test: true });
