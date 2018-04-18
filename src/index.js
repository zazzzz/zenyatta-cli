import { basename } from 'path';
import yaml from 'js-yaml';
import { readFile, renderFile, writeHTMLFile, writeCSSFile } from './utils';

function zenyatta(program) {
  const yamlFile = program.args[0];
  const style = program.style;
  const name = basename(yamlFile, '.yml');

  if (yamlFile && name) {
    try {
      const config = yaml.safeLoad(readFile(yamlFile));

      renderFile('index', config, source => {
        writeHTMLFile(`${name}.html`, source);
      });

      renderFile(`${style}.css`, config, source => {
        writeCSSFile(`${name}.css`, source);
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
}

export default zenyatta;
