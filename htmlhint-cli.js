module.exports = function(){

  'use strict';

  var fs = require('fs');
  var glob = require('glob-all');
  var HTMLHint = require('htmlhint').HTMLHint;

  var args = require('minimist')(process.argv.slice(2));

  glob.sync(args.html+'/**/*.html').forEach(function(file){
    var source = fs.readFileSync(file, 'utf-8');
    var report = HTMLHint.verify(source);
    if(report.length){
      console.log('HTMLHint errors in', file);
      report.forEach(function(message){
        console.log('line', message.line+',', message.type+':', message.message);
      });
    }
  });

};
