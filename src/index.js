import yaml from 'js-yaml';
import {
  renderFile,
  writeHTMLFile,
  writeCSSFile,
  readFile,
} from './utils';

function zenyatta(program) {
  const yamlFile = program.args[0];

  if (yamlFile) {
    try {
      const config = yaml.safeLoad(readFile(yamlFile));

      renderFile('index', config, source => {
        writeHTMLFile('index.html', source);
      });

      renderFile('zatlas.css', config, source => {
        writeCSSFile('zatlas.css', source);
      });
    } catch (e) {
      console.log(e)
      process.exit(1);
    }
  }
}

export default zenyatta;
