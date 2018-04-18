'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zenyatta(program) {
  var yamlFile = program.args[0];
  var style = program.style;
  var name = (0, _path.basename)(yamlFile, '.yml');

  if (yamlFile && name) {
    try {
      var config = _jsYaml2.default.safeLoad((0, _utils.readFile)(yamlFile));

      (0, _utils.renderFile)('index', config, function (source) {
        (0, _utils.writeHTMLFile)(name + '.html', source);
      });

      (0, _utils.renderFile)(style + '.css', config, function (source) {
        (0, _utils.writeCSSFile)(name + '.css', source);
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
}

exports.default = zenyatta;
module.exports = exports['default'];