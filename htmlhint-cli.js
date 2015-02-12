module.exports = function(){

  'use strict';

  var fs = require('fs');
  var glob = require('glob-all');
  var HTMLHint = require('htmlhint').HTMLHint;

  var args = require('minimist')(process.argv.slice(2));
  var ext = args.ext || 'html';
  glob.sync(args.html + '/**/*.' + ext).forEach(function(file){
    var source = fs.readFileSync(file, 'utf-8');
    var report = HTMLHint.verify(source);
    if(report.length){
      console.log('HTML errors in', file);
      report.forEach(function(message){
        console.log('line', message.line+',', message.type+':', message.message);
      });
    }
  });

};
