import * as util from "util";

export function create(options: LoggerOptions): LoggerCall {
  return function(message: string, data?: any) {
    log(options.Name, message, data);
  };
}

export class ClassLogger {
  private spreadData: {} = {};
  private name: string = "Untitled Logger";
  private options: LoggerOptions;
  constructor(options: LoggerOptions, spreadData: {} = {}) {
    this.spreadData = spreadData;
    this.name = options.Name;
    this.options = options;
  }
  public info(message: string, data: {} = {}) {
    log(this.name, message, { ...this.spreadData, ...data, level: "info" });
  }
  public warn(message: string, data: {} = {}) {
    log(this.name, message, { ...this.spreadData, ...data, level: "warn" });
  }
  public error(message: string, data: {} = {}) {
    log(this.name, message, { ...this.spreadData, ...data, level: "error" });
  }
  public withField(field: string, value: any): ClassLogger {
    let sp = { ...this.spreadData };
    sp[field] = value;
    return new ClassLogger(this.options, sp);
  }
}

export function createClassLogger(options: LoggerOptions): ClassLogger {
  return new ClassLogger(options);
}

export function logRaw(str: string) {
  sendToTransport(str);
}
export function addTextTransport(func: (str: string) => void) {
  textTransports.push(func);
}

var consoleTransport = function(str: string): void {
  console.log(str);
};
export function enableConsole() {
  if (textTransports.indexOf(consoleTransport) == -1)
    textTransports.push(consoleTransport);
}
var textTransports: Array<(str: string) => void> = [];
var pretty: boolean = false;

export function setPretty(p: boolean) {
  pretty = p;
}
export interface LoggerOptions {
  Name: string;
}

export interface LoggerCall {
  (message: string, data?: any): void;
}

function date(): string {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  var hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds();

  var am = true;
  if (hour >= 12) {
    am = false;
    hour = hour % 12;
  }
  var hours = "" + hour;
  if (hours.length < 2) hours = "0" + hours;

  var minutes = "" + minute;
  if (minutes.length < 2) minutes = "0" + minutes;
  var seconds = "" + second;
  if (seconds.length < 2) seconds = "0" + seconds;

  return (
    [year, month, day].join("-") +
    " " +
    [hours, minutes, seconds].join(":") +
    (am ? "AM" : "PM")
  );
}

function log(name: string, message: string, data: any) {
  if (pretty) {
    sendToTransport(date() + " | [" + name + "] " + message);
    if (data != undefined) {
      var toString = util.inspect(data, false, 3, true);
      var stringRows = toString.split("\n");
      for (var str of stringRows) {
        sendToTransport(date() + " | [" + name + "]         " + str);
      }
    }
  } else {
    sendToTransport(
      JSON.stringify({
        ...data,
        prefix: name,
        msg: message,
        timestamp: new Date()
      })
    );
  }
}

function sendToTransport(str: string) {
  for (var t of textTransports) {
    t(str);
  }
}
