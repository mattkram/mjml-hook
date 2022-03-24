#!/usr/bin/env node
// This script loops through all files passed as arguments.
//
// For each one, it replaces the extension from .mjml -> .html
// and then runs `mjml filename.mjml -o filename.html` in a
// subprocess.

import {spawn} from 'child_process';


// The first two arguments are node and then mjml_hook
const templates = process.argv.slice(2);

for (const template of templates) {
  const output = template.replace('.mjml', '.html');
  console.log('Rendering', template, '->', output);

  // https://stackoverflow.com/a/16099450
  const prc = spawn('mjml', ['-o', output, template]);

  // Capture stdout
  let lines = [];
  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function(data) {
    const str = data.toString();
    lines = str.split(/(\r?\n)/g);
  });

  // Log to console if any non-zero error codes
  prc.on('close', function(code) {
    if (code !== 0) {
      console.log('process exit code ' + code);
      console.log(lines.join(''));
    }
  });
}
