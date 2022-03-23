#!/usr/bin/env node
// This script loops through all files passed as arguments.
//
// For each one, it replaces the extension from .mjml -> .html
// and then runs `mjml filename.mjml -o filename.html` in a
// subprocess.

const spawn = require('child_process').spawn;

// The first two arguments are node and then mjml_hook
templates = process.argv.slice(2);

for (const template of templates) {
  console.log('Input file: ', template);

  const output = template.replace('.mjml', '.html');
  console.log('Output file: ', output);

  // https://stackoverflow.com/a/16099450
  const prc = spawn('mjml', ['-o', output, template]);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function(data) {
    const str = data.toString();
    const lines = str.split(/(\r?\n)/g);
    console.log(lines.join(''));
  });

  prc.on('close', function(code) {
    console.log('process exit code ' + code);
  });
}
