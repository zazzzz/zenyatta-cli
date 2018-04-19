#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version, '-v, --version')
  .usage('<YAML-file> [options]')
  .option('-s, --style <item>', 'choose specific style', 'zatlas')
  .parse(process.argv);

require('../lib')(program);
