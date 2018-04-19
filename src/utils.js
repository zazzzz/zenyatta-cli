import ejs from 'ejs';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { outputFileSync, removeSync } from 'fs-extra';
import { html, css } from 'js-beautify';

export function getTemplate(name) {
  return resolve(__dirname, `../boilerplates/${name}.ejs`);
}

export function renderFile(name, data, callback) {
  const file = getTemplate(name);

  ejs.renderFile(file, data, function(err, str) {
    if (!err) {
      callback(str);
    } else {
      throw err;
    }
  });
}

export function readFile(filePath) {
  return readFileSync(filePath, 'utf-8');
}

export function writeFile(filePath, source) {
  removeFile(filePath);
  outputFileSync(filePath, source, 'utf-8');
}

export function writeHTMLFile(filePath, source) {
  const formatted = html(source, {
    indent_size: 2,
    end_with_newline: true,
    preserve_newlines: false,
    wrap_line_length: 100,
    unformatted: [],
  });
  writeFile(filePath, formatted);
}

export function writeCSSFile(filePath, source) {
  const formatted = css(source, {
    indent_size: 2,
    end_with_newline: true,
  });
  writeFile(filePath, formatted);
}

export function removeFile(filePath) {
  removeSync(filePath);
}
