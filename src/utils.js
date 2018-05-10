import ejs from 'ejs';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { outputFileSync, removeSync, copySync } from 'fs-extra';
import { html, css, js } from 'js-beautify';

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

export function removeFile(filePath) {
  removeSync(filePath);
}

export function getFilePath(basePath, fileName) {
  return resolve(basePath, fileName);
}

export function writeHTMLFile(fileName, source, basePath) {
  const formatted = html(source, {
    indent_size: 2,
    end_with_newline: true,
    preserve_newlines: false,
    wrap_line_length: 100,
    unformatted: [],
  });
  const filePath = getFilePath(basePath, fileName);
  writeFile(filePath, formatted);
}

export function writeCSSFile(fileName, source, basePath) {
  const formatted = css(source, {
    indent_size: 2,
    end_with_newline: true,
  });
  const filePath = getFilePath(basePath, fileName);
  writeFile(filePath, formatted);
}

export function writeJSFile(fileName, source, basePath) {
  const formatted = js(source, {
    indent_size: 2,
    end_with_newline: true,
  });
  const filePath = getFilePath(basePath, fileName);
  writeFile(filePath, formatted);
}

export function copyThirdFile(path) {
  const source = resolve(__dirname, '../third');
  const target = resolve(path, 'third');
  copySync(source, target);
}
