'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplate = getTemplate;
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
  return (0, _path.resolve)(__dirname, '../boilerplates/' + name + '.ejs');
}

function renderFile(name, data, callback) {
  var file = getTemplate(name);

  _ejs2.default.renderFile(file, data, function (err, str) {
    if (!err) {
      callback(str);
    } else {
      throw err;
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
    indent_size: 2,
    end_with_newline: true,
    preserve_newlines: false,
    wrap_line_length: 100,
    unformatted: []
  });
  (0, _fsExtra.outputFileSync)(filePath, result, 'utf-8');
}

function writeCSSFile(filePath, source) {
  var result = (0, _jsBeautify.css)(source, {
    indent_size: 2,
    end_with_newline: true
  });
  (0, _fsExtra.outputFileSync)(filePath, result, 'utf-8');
}

function removeFile(filePath) {
  (0, _fsExtra.removeSync)(filePath);
}