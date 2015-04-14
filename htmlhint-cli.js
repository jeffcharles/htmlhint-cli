module.exports = function(){

  'use strict';

  var fs = require('fs');
  var glob = require('glob-all');
  var HTMLHint = require('htmlhint').HTMLHint;

  var rules = {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": true,
    "tag-pair": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true
  }

  var rulesPath = process.cwd() + '/.htmlhintrc';
  if(fs.existsSync(rulesPath)){
    rules = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));
  }

  var args = require('minimist')(process.argv.slice(2));
  var ext = args.ext || 'html';
  glob.sync(args.html + '/**/*.' + ext).forEach(function(file){
    var source = fs.readFileSync(file, 'utf-8');
    var report = HTMLHint.verify(source, rules);
    if(report.length){
      console.log('HTML errors in', file);
      report.forEach(function(message){
        console.log('line', message.line+',', message.type+':', message.message);
      });
    }
  });

};
