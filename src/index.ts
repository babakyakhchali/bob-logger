import * as colors from './colors';
import { sprintf } from "sprintf-js";
import { createWriteStream, WriteStream } from 'fs';
export enum LevelEnum {
    'DBG'=1,
    'LOG',
    'INF',
    'WRN',
    'ERR',
}
export interface IWriter {
    name: string;
    write(li: ILogItem): void;
}

export class FileWriter implements IWriter {
    name = 'FileWriter';
    formatter: IFormatter;
    private stream:WriteStream;
    constructor(private filePath:string,formatter?:IFormatter){
        this.formatter = formatter || new SimpleFormatter;
        this.stream = createWriteStream(filePath);
    }    
    write(li: ILogItem): void {
        this.stream.write(this.formatter.format(li)+"\n");
    }
}

export class ConsoleWriter implements IWriter {
    formatter: IFormatter;
    name = 'ConsoleWriter';
    constructor(formatter?: IFormatter) {
        this.formatter = formatter || new SimpleFormatter;
    }
    write(li: ILogItem): void {
        let c = colors.FgWhite;

        switch (li.level) {
            case LevelEnum.DBG:
                c = colors.FgBlue
                break;
            case LevelEnum.LOG:
                c = colors.FgWhite;
                break;
            case LevelEnum.INF:
                c = colors.FgGreen;
                break;
            case LevelEnum.WRN:
                c = colors.FgYellow;
                break;
            case LevelEnum.ERR:
                c = colors.FgRed;
                break;
            default:
                break;
        }
        console.log(c + "%s\x1b[0m", this.formatter.format(li));
    }
}

export interface IFormatter {
    format(li: ILogItem): string;
}

export class SimpleFormatter implements IFormatter {
    format(li: ILogItem) {
        const cat = li.category ? `[${li.category}] ` : '';
        return this.dateFormatter(new Date())  + `[${LevelEnum[li.level]}]`.padEnd(6) + cat + li.text;
    }
    private dateFormatter(d:Date){
        return `${d.getFullYear()}-${d.getMonth().toString().padStart(2,'0')}-${d.getDay().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`
    }

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

const moduleWriters: IWriter[] = []

export function init(writers?: IWriter[]) {
    if (writers) {
        writers.forEach(w => moduleWriters.push(w));
    } else {
        moduleWriters.push(new ConsoleWriter);
    }
}

export interface IBobLoggerOptions {
    category?:string;
    level?:LevelEnum;
}
export class BobLogger {
    private category?:string;
    private level:LevelEnum;
    constructor(opts:IBobLoggerOptions) {
        this.category = opts.category;
        this.level = opts.level||LevelEnum.LOG
    }
    write(s: string, l: LevelEnum,...args: any[]) {
        if(l<this.level){
            return;
        }
        const li: ILogItem = {
            level: l,
            text: sprintf(s,...args) ,            
            ts: new Date,
            category: this.category,            
        };
        for (const w of moduleWriters) {
            w.write(li);
        }
    }
    debug(s: string,...args: any[]) {        
        this.write(s, LevelEnum.DBG,...args);
    }
    log(s: string,...args: any[]) {        
        this.write(s, LevelEnum.LOG,...args);
    }
    info(s: string,...args: any[]) {
        this.write(s, LevelEnum.INF,...args);
    }
    warn(s: string,...args: any[]) {
        this.write(s, LevelEnum.WRN,...args);
    }
    error(s: string,...args: any[]) {
        this.write(s, LevelEnum.ERR,...args);
    }
}