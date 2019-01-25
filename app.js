"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var util = require("util");
function create(options) {
    return function (message, data) {
        log(options.Name, message, data);
    };
}
exports.create = create;
var ClassLogger = /** @class */ (function () {
    function ClassLogger(options, spreadData) {
        if (spreadData === void 0) { spreadData = {}; }
        this.spreadData = {};
        this.name = "Untitled Logger";
        this.spreadData = spreadData;
        this.name = options.Name;
        this.options = options;
    }
    ClassLogger.prototype.info = function (message, data) {
        if (data === void 0) { data = {}; }
        log(this.name, message, __assign({}, this.spreadData, data, { level: "info" }));
    };
    ClassLogger.prototype.warn = function (message, data) {
        if (data === void 0) { data = {}; }
        log(this.name, message, __assign({}, this.spreadData, data, { level: "warn" }));
    };
    ClassLogger.prototype.error = function (message, data) {
        if (data === void 0) { data = {}; }
        log(this.name, message, __assign({}, this.spreadData, data, { level: "error" }));
    };
    ClassLogger.prototype.withField = function (field, value) {
        var sp = __assign({}, this.spreadData);
        sp[field] = value;
        return new ClassLogger(this.options, sp);
    };
    return ClassLogger;
}());
exports.ClassLogger = ClassLogger;
function createClassLogger(options) {
    return new ClassLogger(options);
}
exports.createClassLogger = createClassLogger;
function logRaw(str) {
    sendToTransport(str);
}
exports.logRaw = logRaw;
function addTextTransport(func) {
    textTransports.push(func);
}
exports.addTextTransport = addTextTransport;
var consoleTransport = function (str) {
    console.log(str);
};
function enableConsole() {
    if (textTransports.indexOf(consoleTransport) == -1)
        textTransports.push(consoleTransport);
}
exports.enableConsole = enableConsole;
var textTransports = [];
var pretty = false;
function setPretty(p) {
    pretty = p;
}
exports.setPretty = setPretty;
function date() {
    var d = new Date(), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;
    var hour = d.getHours(), minute = d.getMinutes(), second = d.getSeconds();
    var am = true;
    if (hour >= 12) {
        am = false;
        hour = hour % 12;
    }
    var hours = "" + hour;
    if (hours.length < 2)
        hours = "0" + hours;
    var minutes = "" + minute;
    if (minutes.length < 2)
        minutes = "0" + minutes;
    var seconds = "" + second;
    if (seconds.length < 2)
        seconds = "0" + seconds;
    return ([year, month, day].join("-") +
        " " +
        [hours, minutes, seconds].join(":") +
        (am ? "AM" : "PM"));
}
function log(name, message, data) {
    if (pretty) {
        sendToTransport(date() + " | [" + name + "] " + message);
        if (data != undefined) {
            var toString = util.inspect(data, false, 3, true);
            var stringRows = toString.split("\n");
            for (var _i = 0, stringRows_1 = stringRows; _i < stringRows_1.length; _i++) {
                var str = stringRows_1[_i];
                sendToTransport(date() + " | [" + name + "]         " + str);
            }
        }
    }
    else {
        sendToTransport(JSON.stringify(__assign({}, data, { prefix: name, msg: message, timestamp: new Date() })));
    }
}
function sendToTransport(str) {
    for (var _i = 0, textTransports_1 = textTransports; _i < textTransports_1.length; _i++) {
        var t = textTransports_1[_i];
        t(str);
    }
}
