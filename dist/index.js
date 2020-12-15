"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BobLogger = exports.init = exports.SimpleFormatter = exports.ConsoleWriter = exports.FileWriter = exports.LevelEnum = void 0;
const colors = __importStar(require("./colors"));
const sprintf_js_1 = require("sprintf-js");
const fs_1 = require("fs");
var LevelEnum;
(function (LevelEnum) {
    LevelEnum[LevelEnum["DBG"] = 1] = "DBG";
    LevelEnum[LevelEnum["LOG"] = 2] = "LOG";
    LevelEnum[LevelEnum["INF"] = 3] = "INF";
    LevelEnum[LevelEnum["WRN"] = 4] = "WRN";
    LevelEnum[LevelEnum["ERR"] = 5] = "ERR";
})(LevelEnum = exports.LevelEnum || (exports.LevelEnum = {}));
class FileWriter {
    constructor(filePath, formatter) {
        this.filePath = filePath;
        this.name = 'FileWriter';
        this.formatter = formatter || new SimpleFormatter;
        this.stream = fs_1.createWriteStream(filePath, { flags: 'a' });
    }
    write(li) {
        this.stream.write(this.formatter.format(li) + "\n");
    }
}
exports.FileWriter = FileWriter;
class ConsoleWriter {
    constructor(formatter) {
        this.name = 'ConsoleWriter';
        this.formatter = formatter || new SimpleFormatter;
    }
    write(li) {
        let c = colors.FgWhite;
        switch (li.level) {
            case LevelEnum.DBG:
                c = colors.FgBlue;
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
exports.ConsoleWriter = ConsoleWriter;
class SimpleFormatter {
    format(li) {
        const cat = li.category ? `[${li.category}] ` : '';
        return this.dateFormatter(new Date()) + ` [${LevelEnum[li.level]}]`.padEnd(7) + cat + li.text;
    }
    dateFormatter(d) {
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    }
}
exports.SimpleFormatter = SimpleFormatter;
const moduleWriters = [];
function init(writers) {
    if (writers) {
        writers.forEach(w => moduleWriters.push(w));
    }
    else {
        moduleWriters.push(new ConsoleWriter);
    }
}
exports.init = init;
class BobLogger {
    constructor(opts) {
        this.category = opts.category;
        this.level = opts.level || LevelEnum.DBG;
    }
    write(s, l, ...args) {
        if (l < this.level) {
            return;
        }
        const li = {
            level: l,
            text: sprintf_js_1.sprintf(s, ...args),
            ts: new Date,
            category: this.category,
        };
        for (const w of moduleWriters) {
            w.write(li);
        }
    }
    debug(s, ...args) {
        this.write(s, LevelEnum.DBG, ...args);
    }
    log(s, ...args) {
        this.write(s, LevelEnum.LOG, ...args);
    }
    info(s, ...args) {
        this.write(s, LevelEnum.INF, ...args);
    }
    warn(s, ...args) {
        this.write(s, LevelEnum.WRN, ...args);
    }
    error(s, ...args) {
        this.write(s, LevelEnum.ERR, ...args);
    }
}
exports.BobLogger = BobLogger;
//# sourceMappingURL=index.js.map