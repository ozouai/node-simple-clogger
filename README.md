Simplistic Logging with colors and custom transport support

## Installation

From NPM

    npm install simple-clogger

Typescript

	import * as logger from "simple-clogger";
	
Javascript

	var logger = require("simple-clogger");

## Usage

First you can enable console output

	logger.enableConsole();


You can use the create function to generate a function that you can call to log data.

It takes an option array, with a property called name. The name should be the source of the log message.

	var log = logger.create({Name: "Main App"});
	log("Got Array", {Hello: "World", PI: 3.14});

And it will print something like this

	2017-04-09 04:17:23PM | [Main App] Got Array
	2017-04-09 04:17:23PM | [Main App]         { Hello: 'World', PI: 3.14 }

## Custom Transports

You can add custom transports that will trigger when a message needs to be sent

	logger.addTextTransport(function(string) {
		socket.send(string);
	});