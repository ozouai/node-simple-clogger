"use strict";
var util = require("util");
function create(options) {
    return function (message, data) {
        log(options.Name, message, data);
    };
}
exports.create = create;
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
function date() {
    var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
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
    return [year, month, day].join('-') + " " + [hours, minutes, seconds].join(":") + (am ? "AM" : "PM");
}
function log(name, message, data) {
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
function sendToTransport(str) {
    for (var _i = 0, textTransports_1 = textTransports; _i < textTransports_1.length; _i++) {
        var t = textTransports_1[_i];
        t(str);
    }
}
//# sourceMappingURL=app.js.map