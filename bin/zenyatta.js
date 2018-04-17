#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version, '-v, --version')
  .usage('yaml-file')
  .parse(process.argv);

require('../lib')(program);
