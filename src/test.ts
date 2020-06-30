import { BobLogger, init, LevelEnum, ConsoleWriter, FileWriter } from './index';
init([new ConsoleWriter,new FileWriter('./out.log')]);
const l = new  BobLogger({category:'bob',level:LevelEnum.DBG});
l.debug('log %s whoooo','hi hi');
l.log('log %s whoooo','hi hi');
l.info('info');
l.warn('warn');
l.error('error %j',{a:"bob",d:new Date});