export declare enum LevelEnum {
    'DBG' = 1,
    'LOG' = 2,
    'INF' = 3,
    'WRN' = 4,
    'ERR' = 5
}
export interface IWriter {
    name: string;
    write(li: ILogItem): void;
}
export declare class FileWriter implements IWriter {
    private filePath;
    name: string;
    formatter: IFormatter;
    private stream;
    constructor(filePath: string, formatter?: IFormatter);
    write(li: ILogItem): void;
}
export declare class ConsoleWriter implements IWriter {
    formatter: IFormatter;
    name: string;
    constructor(formatter?: IFormatter);
    write(li: ILogItem): void;
}
export interface IFormatter {
    format(li: ILogItem): string;
}
export declare class SimpleFormatter implements IFormatter {
    format(li: ILogItem): string;
    private dateFormatter;
}
export interface ILoggerOptions {
    category?: string;
    writers?: IWriter[];
}
interface ILogItem {
    ts: Date;
    text: string;
    level: LevelEnum;
    category?: string;
}
export declare function init(writers?: IWriter[]): void;
export interface IBobLoggerOptions {
    category?: string;
    level?: LevelEnum;
}
export declare class BobLogger {
    private category?;
    private level;
    constructor(opts: IBobLoggerOptions);
    write(s: string, l: LevelEnum, ...args: any[]): void;
    debug(s: string, ...args: any[]): void;
    log(s: string, ...args: any[]): void;
    info(s: string, ...args: any[]): void;
    warn(s: string, ...args: any[]): void;
    error(s: string, ...args: any[]): void;
}
export {};
//# sourceMappingURL=index.d.ts.map