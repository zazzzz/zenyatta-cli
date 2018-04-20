'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _fs = require('fs');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _console = require('./console');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zenyatta(program) {
  if (!program.args.length) {
    program.help();
    process.exit(1);
  }

  var cwd = process.cwd();
  var yamlFile = program.args[0];
  var style = program.style || 'zatlas';
  var dir = (0, _path.resolve)(cwd, program.dir || '');

  if (!yamlFile || !(0, _fs.existsSync)(yamlFile)) {
    (0, _console.error)('To start, you must enter a YAML file', {
      blankStart: true,
      blankEnd: true
    });
    process.exit(1);
  }

  try {
    var spinner = (0, _ora2.default)('Parsing ' + yamlFile).start();
    (0, _console.log)();

    var name = (0, _path.basename)(yamlFile, '.yml');
    var config = _jsYaml2.default.safeLoad((0, _utils.readFile)(yamlFile));

    (0, _utils.renderFile)('index', config, function (source) {
      (0, _utils.writeHTMLFile)(name + '.html', source, dir);
      (0, _console.success)('create ' + name + '.html', {
        blankStart: true,
        paddingLeft: 6
      });
    });

    (0, _utils.renderFile)('style-' + style, config, function (source) {
      (0, _utils.writeCSSFile)(name + '.css', source, dir);
      (0, _console.success)('create ' + name + '.css', {
        blankEnd: true,
        paddingLeft: 6
      });
    });

    spinner.succeed('Success generate page: ' + name);
  } catch (err) {
    (0, _console.error)(err, {
      blankStart: true,
      blankEnd: true
    });
    process.exit(1);
  }
}

exports.default = zenyatta;
module.exports = exports['default'];