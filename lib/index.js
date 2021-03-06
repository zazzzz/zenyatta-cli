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

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zenyatta(program) {
  if (!program.args.length) {
    program.help();
    process.exit(1);
  }

  var cwd = process.cwd();
  var yamlFile = program.args[0];
  var template = program.template || 'zatlas';
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
    var config = _jsYaml2.default.safeLoad(utils.readFile(yamlFile));
    config._name_ = name;

    utils.renderFile(template + '/index', config, function (source) {
      utils.writeHTMLFile(name + '.html', source, dir);
      (0, _console.success)('create ' + name + '.html', {
        blankStart: true,
        paddingLeft: 6
      });
    });

    utils.renderFile(style + '/style', {}, function (source) {
      utils.writeCSSFile(name + '.css', source, dir);
      (0, _console.success)('create ' + name + '.css', {
        paddingLeft: 6
      });
    });

    utils.renderFile(style + '/script', {}, function (source) {
      utils.writeJSFile(name + '.js', source, dir);
      (0, _console.success)('create ' + name + '.js', {
        blankEnd: true,
        paddingLeft: 6
      });
    });

    utils.copyThirdFile(dir);

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