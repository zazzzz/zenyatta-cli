import chalk from 'chalk';
import leftPad from 'left-pad';

function baseLog(chalked, message = '', config = {}) {
  config.blankStart && console.log();

  const msg = config.paddingLeft
    ? `${leftPad('', config.paddingLeft)}${message}`
    : message;
  console.log(chalked(msg));

  config.blankEnd && console.log();
}

export function log() {
  baseLog(chalk.white, ...arguments);
}

export function success() {
  baseLog(chalk.green, ...arguments);
}

export function error() {
  baseLog(chalk.red, ...arguments);
}
