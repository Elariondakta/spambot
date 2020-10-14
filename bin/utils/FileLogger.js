"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
const fs = require("fs/promises");
const fs_1 = require("fs");
const path_1 = require("path");
class FileLogger extends Logger_1.default {
    constructor(name, datetime) {
        super(name, datetime);
        this.init();
    }
    async init() {
        const folderPath = path_1.join(process.cwd(), "logs");
        if (!fs_1.existsSync(folderPath)) {
            fs.mkdir(folderPath);
        }
        this._logFile = await fs.open(path_1.join(folderPath, `${name}.log`), "w");
    }
    log(...args) {
        super.log(...args);
        this.logFile(LogType.Log, ...args);
    }
    error(...args) {
        super.log(...args);
        this.logFile(LogType.Error, ...args);
    }
    logFile(type, ...args) {
        const lines = args.join(" ").split("\n");
        for (const line of lines)
            this._logFile.write(`\r\n${type} ${this.getTime()} ${line}`);
    }
}
exports.default = FileLogger;
var LogType;
(function (LogType) {
    LogType["Error"] = "ERR";
    LogType["Log"] = "LOG";
})(LogType || (LogType = {}));
