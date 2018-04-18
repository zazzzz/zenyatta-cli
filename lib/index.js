'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zenyatta(program) {
  var yamlFile = program.args[0];

  if (yamlFile) {
    try {
      var config = _jsYaml2.default.safeLoad((0, _utils.readFile)(yamlFile));

      (0, _utils.renderFile)('index', config, function (source) {
        (0, _utils.writeHTMLFile)('index.html', source);
      });

      (0, _utils.renderFile)('zatlas.css', config, function (source) {
        (0, _utils.writeCSSFile)('zatlas.css', source);
      });
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
}

exports.default = zenyatta;
module.exports = exports['default'];