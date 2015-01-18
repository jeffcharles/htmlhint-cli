var fs = require('fs');
var glob = require('glob-all');
var HTMLHint = require('htmlhint').HTMLHint;

var args = require('minimist')(process.argv.slice(2));

HTMLHint.defaultRuleset = {
  "tagname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "attr-value-not-empty": false,
  "doctype-first": false,
  "tag-pair": true,
  "tag-self-close": false,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "head-script-disabled": false,
  "img-alt-require": true,
  "doctype-html5": true,
  "id-class-value": true,
  "style-disabled": true
};

glob.sync(args.html+'/**/*.html').forEach(function(file){
  var source = fs.readFileSync(file, 'utf-8');
  var report = HTMLHint.verify(source);
  if(report.length){
    has_warnings = true;
    console.log('HTMLHint errors in', file);
    report.forEach(function(message){
      console.log('line', message.line+',', message.type+':', message.message);
    });
  }
});

