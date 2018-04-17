import ejs from 'ejs';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { outputFileSync, removeSync } from 'fs-extra';
import { html } from 'js-beautify';

export function getTemplate(name) {
  const filePath = join(__dirname, `../boilerplates/${name}.ejs`);
  const source = readFileSync(filePath, 'utf-8');
  return source;
}

export function renderTemplate(name, data) {
  const template = getTemplate(name);
  const source = ejs.render(template, data);
  return source;
}

export function renderFile(name, data, cb) {
  const filePath = join(__dirname, `../boilerplates/${name}.ejs`);
  ejs.renderFile(filePath, data, function (err, str) {
    if (!err) {
      cb(str);
    }
  });
}

export function readFile(filePath) {
  return readFileSync(filePath, 'utf-8');
}

export function writeFile(filePath, source) {
  outputFileSync(filePath, source, 'utf-8');
}

export function writeHTMLFile(filePath, source) {
  const result = html(source, {
    preserve_newlines: false
  });
  outputFileSync(filePath, result, 'utf-8');
}

export function removeFile(filePath) {
  removeSync(filePath);
}
