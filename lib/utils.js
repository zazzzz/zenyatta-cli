'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplate = getTemplate;
exports.renderTemplate = renderTemplate;
exports.renderFile = renderFile;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.writeHTMLFile = writeHTMLFile;
exports.writeCSSFile = writeCSSFile;
exports.removeFile = removeFile;

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _path = require('path');

var _fs = require('fs');

var _fsExtra = require('fs-extra');

var _jsBeautify = require('js-beautify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTemplate(name) {
  var filePath = (0, _path.join)(__dirname, '../boilerplates/' + name + '.ejs');
  var source = (0, _fs.readFileSync)(filePath, 'utf-8');
  return source;
}

function renderTemplate(name, data) {
  var template = getTemplate(name);
  var source = _ejs2.default.render(template, data);
  return source;
}

function renderFile(name, data, cb) {
  var filePath = (0, _path.join)(__dirname, '../boilerplates/' + name + '.ejs');
  _ejs2.default.renderFile(filePath, data, function (err, str) {
    if (!err) {
      cb(str);
    }
  });
}

function readFile(filePath) {
  return (0, _fs.readFileSync)(filePath, 'utf-8');
}

function writeFile(filePath, source) {
  (0, _fsExtra.outputFileSync)(filePath, source, 'utf-8');
}

function writeHTMLFile(filePath, source) {
  var result = (0, _jsBeautify.html)(source, {
    preserve_newlines: false
  });
  (0, _fsExtra.outputFileSync)(filePath, result, 'utf-8');
}

function writeCSSFile(filePath, source) {
  var result = (0, _jsBeautify.css)(source, {});
  (0, _fsExtra.outputFileSync)(filePath, result, 'utf-8');
}

function removeFile(filePath) {
  (0, _fsExtra.removeSync)(filePath);
}