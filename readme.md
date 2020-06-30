# About
A simple library for logging to console and/or file

# Build
after clone
```bash  
npm i
npm run build
```

# Usage

```typescript
import { BobLogger, LevelEnum, init, ConsoleWriter, FileWriter } from '../src/index';

init([new ConsoleWriter,new FileWriter('./test.log')]);

const logger = new BobLogger({ level: LevelEnum.DBG });
logger.debug('Hi there %s', 'john doe');
logger.log('Hi there %s', 'john doe');
logger.info('Hi there %s', 'john doe');
logger.warn('Hi there %s', 'john doe');
logger.error('Hi there %s', 'john doe');

const logger = new BobLogger({ level: LevelEnum.DBG ,category:'test'});
logger.debug('Hi there %s', 'john doe');
logger.log('Hi there %s', 'john doe');
logger.info('Hi there %s', 'john doe');
logger.warn('Hi there %s', 'john doe');
logger.error('Hi there %s', 'john doe');
```
the output is:
```sh 
2020-05-02 15:38:10[DBG] Hi there john doe
2020-05-02 15:38:10[LOG] Hi there john doe
2020-05-02 15:38:10[INF] Hi there john doe
2020-05-02 15:38:10[WRN] Hi there john doe
2020-05-02 15:38:10[ERR] Hi there john doe

2020-05-02 15:38:10[DBG] [test] Hi there john doe
2020-05-02 15:38:10[LOG] [test] Hi there john doe
2020-05-02 15:38:10[INF] [test] Hi there john doe
2020-05-02 15:38:10[WRN] [test] Hi there john doe
2020-05-02 15:38:10[ERR] [test] Hi there john doe
```
# Test
to test use
```bash
npm run test
```