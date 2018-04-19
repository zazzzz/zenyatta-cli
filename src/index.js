import { basename } from 'path';
import { existsSync } from 'fs';
import yaml from 'js-yaml';
import ora from 'ora';
import { log, success, error } from './console';
import { readFile, renderFile, writeHTMLFile, writeCSSFile } from './utils';

function zenyatta(program) {
  if (!program.args.length) {
    program.help()
  }

  const yamlFile = program.args[0];
  const style = program.style;

  if (!yamlFile || !existsSync(yamlFile)) {
    error('To start, you must enter a YAML file', {
      blankStart: true,
      blankEnd: true,
    });
    process.exit(1)
  }

  try {
    const spinner = ora(`parsing ${yamlFile}`).start();
    log();

    const name = basename(yamlFile, '.yml');
    const config = yaml.safeLoad(readFile(yamlFile));

    renderFile('index', config, source => {
      writeHTMLFile(`${name}.html`, source);
      success(`create ${name}.html`, {
        blankStart: true,
        paddingLeft: 6,
      });
    });

    renderFile(`style-${style}`, config, source => {
      writeCSSFile(`${name}.css`, source);
      success(`create ${name}.css`, {
        blankEnd: true,
        paddingLeft: 6,
      });
    });

    spinner.succeed(`success generate page: ${name}`);
  } catch (err) {
    error(err, {
      blankStart: true,
      blankEnd: true,
    });
    process.exit(1);
  }
}

export default zenyatta;
