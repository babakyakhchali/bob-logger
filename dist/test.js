"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.init([new index_1.ConsoleWriter, new index_1.FileWriter('./out.log')]);
const l = new index_1.BobLogger({ category: 'bob', level: index_1.LevelEnum.DBG });
l.debug('log %s whoooo', 'hi hi');
l.log('log %s whoooo', 'hi hi');
l.info('info');
l.warn('warn');
l.error('error %j', { a: "bob", d: new Date });
//# sourceMappingURL=test.js.map