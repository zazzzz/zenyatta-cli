import yaml from 'js-yaml';
import {
  renderFile,
  writeHTMLFile,
  readFile,
} from './utils';

function zenyatta(program) {
  const yamlFile = program.args[0];

  if (yamlFile) {
    try {
      const config = yaml.safeLoad(readFile(yamlFile));
      renderFile('index', config, source => {
        console.log(source);
        writeHTMLFile('hehe.html', source);
      });
    } catch (e) {
      console.log(e)
      process.exit(1);
    }
  }
}

export default zenyatta;
