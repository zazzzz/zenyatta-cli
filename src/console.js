import chalk from 'chalk';
import leftPad from 'left-pad';

function baseLog(type, message = '', config = {}) {
  config.blankStart && console.log();
  const msg = config.paddingLeft
    ? `${leftPad('', config.paddingLeft)}${message}`
    : message;
  console.log(chalk[type](msg));
  config.blankEnd && console.log();
}

export function log() {
  baseLog('white', ...arguments);
}

export function success() {
  baseLog('green', ...arguments);
}

export function error() {
  baseLog('red', ...arguments);
}
