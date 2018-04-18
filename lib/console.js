'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.success = success;
exports.error = error;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _leftPad = require('left-pad');

var _leftPad2 = _interopRequireDefault(_leftPad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseLog(type) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  config.blankStart && console.log();
  var msg = config.paddingLeft ? '' + (0, _leftPad2.default)('', config.paddingLeft) + message : message;
  console.log(_chalk2.default[type](msg));
  config.blankEnd && console.log();
}

function log() {
  baseLog.apply(undefined, ['white'].concat(Array.prototype.slice.call(arguments)));
}

function success() {
  baseLog.apply(undefined, ['green'].concat(Array.prototype.slice.call(arguments)));
}

function error() {
  baseLog.apply(undefined, ['red'].concat(Array.prototype.slice.call(arguments)));
}