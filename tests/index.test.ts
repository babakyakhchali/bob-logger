import { BobLogger, LevelEnum, init, ConsoleWriter, FileWriter } from '../src/index';
describe('logger', function () {
  it('init', function () {
    init([new ConsoleWriter,new FileWriter('./test.log')]);
  });
  it('create', function () {
    const logger = new BobLogger({ level: LevelEnum.DBG });
    logger.debug('Hi there %s', 'john doe');
    logger.log('Hi there %s', 'john doe');
    logger.info('Hi there %s', 'john doe');
    logger.warn('Hi there %s', 'john doe');
    logger.error('Hi there %s', 'john doe');
  });
  it('create with category', function () {
    const logger = new BobLogger({ level: LevelEnum.DBG ,category:'test'});
    logger.debug('Hi there %s', 'john doe');
    logger.log('Hi there %s', 'john doe');
    logger.info('Hi there %s', 'john doe');
    logger.warn('Hi there %s', 'john doe');
    logger.error('Hi there %s', 'john doe');
  });
});