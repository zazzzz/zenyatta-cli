#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version, '-v, --version')
  .usage('<YAML-file> [options]')
  .option('-s, --style <item>', 'choose specific style', 'zatlas')
  .option('-d, --dir <path>', 'choose output dir')
  .parse(process.argv);

require('../lib')(program);
