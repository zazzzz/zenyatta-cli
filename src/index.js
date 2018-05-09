import { resolve, basename } from 'path';
import { existsSync } from 'fs';
import yaml from 'js-yaml';
import ora from 'ora';
import { log, success, error } from './console';
import { readFile, renderFile, writeHTMLFile, writeCSSFile, writeJSFile, copyThirdFile } from './utils';

function zenyatta(program) {
  if (!program.args.length) {
    program.help();
    process.exit(1);
  }

  const cwd = process.cwd();
  const yamlFile = program.args[0];
  const template = program.template || 'zatlas';
  const style = program.style || 'zatlas';
  const dir = resolve(cwd, program.dir || '');

  if (!yamlFile || !existsSync(yamlFile)) {
    error('To start, you must enter a YAML file', {
      blankStart: true,
      blankEnd: true,
    });
    process.exit(1);
  }

  try {
    const spinner = ora(`Parsing ${yamlFile}`).start();
    log();

    const name = basename(yamlFile, '.yml');
    const config = yaml.safeLoad(readFile(yamlFile));
    config._name = name;

    renderFile(`${template}/index`, config, source => {
      writeHTMLFile(`${name}.html`, source, dir);
      success(`create ${name}.html`, {
        blankStart: true,
        paddingLeft: 6,
      });
    });

    renderFile(`${style}/style`, {}, source => {
      writeCSSFile(`${name}.css`, source, dir);
      success(`create ${name}.css`, {
        paddingLeft: 6,
      });
    });

    renderFile(`${style}/script`, {}, source => {
      writeJSFile(`${name}.js`, source, dir);
      success(`create ${name}.js`, {
        blankEnd: true,
        paddingLeft: 6,
      });
    });

    copyThirdFile(dir);

    spinner.succeed(`Success generate page: ${name}`);
  } catch (err) {
    error(err, {
      blankStart: true,
      blankEnd: true,
    });
    process.exit(1);
  }
}

export default zenyatta;
