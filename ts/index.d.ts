export declare function create(options: LoggerOptions): LoggerCall;
export declare function logRaw(str: string): void;
export declare function addTextTransport(func: (str: string) => void): void;
export declare function enableConsole(): void;
export interface LoggerOptions {
    Name: string;
}
export interface LoggerCall {
    (message: string, data?: any): void;
}
