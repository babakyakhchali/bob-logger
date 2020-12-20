import { BobLogger, init, LevelEnum, ConsoleWriter, FileWriter } from './index';
init([new ConsoleWriter, new FileWriter('./out.log')]);
const l = new BobLogger({ category: 'bob', level: LevelEnum.DBG });
l.debug('log %s whoooo', 'hi hi');
l.log('log %s whoooo', 'hi hi');
l.info('info');
l.warn('warn');
l.error('error %j', { a: "bob", d: new Date });
async function tt() {
    let a: any = {}
    a.b.c = 2
}
tt()

process.on('uncaughtException', function (error) {    
l.error('uncaughtException %s stack %s',error,error.stack)
});
process.on('unhandledRejection', function (reason, p) {    
    l.error(' unhandledRejection %s for promise:%s %s',reason,p,(reason as any).stack)
});