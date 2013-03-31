/*
 * grunt-html2js
 * https://github.com/karlgoldstein/grunt-html2js
 *
 * Copyright (c) 2013 Karl Goldstein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  var escapeContent = function(content) {
    return content.replace(/"/g, '\\"').replace(/\r?\n/g, '\\n" +\n    "');
  };

  // convert Windows file separator URL path separator
  var normalizePath = function(p) {
    if ( path.sep !== '/' ) {
      p = p.replace(/\\/g, '/');
    }
    return p;
  };

  // Warn on and remove invalid source files (if nonull was set).  
  var existsFilter = function(filepath) {

    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  };

  // compile a template to an angular module
  var compileTemplate = function(moduleName, filepath) {

    var content = escapeContent(grunt.file.read(filepath));

    var module = 'angular.module("' + moduleName + 
      '", []).run(["$templateCache", function($templateCache) ' +
      '{\n  $templateCache.put("' + moduleName + '",\n    "' +  content + 
      '");\n}]);\n';

    return module;
  };

  grunt.registerMultiTask('html2js', 'Compiles Angular-JS templates to JavaScript.', function() {

    var options = this.options({
      base: 'src',
      module: 'templates-' + this.target
    });

    // generate a separate module
    this.files.forEach(function(f) {

      var moduleNames = [];

      var modules = f.src.filter(existsFilter).map(function(filepath) {

        var moduleName = normalizePath(path.relative(options.base, filepath));
        moduleNames.push("'" + moduleName + "'");

        return compileTemplate(moduleName, filepath);

      }).join(grunt.util.normalizelf('\n'));

      var bundle = "";
      var targetModule = f.module || options.module;
      //Allow a 'no targetModule if module is null' option
      if (targetModule) {
        bundle = "angular.module('" + targetModule + "', [" + 
          moduleNames.join(', ') + "]);\n\n";
      }
      grunt.file.write(f.dest, bundle + modules);
    });
    //Just have one output, so if we making thirty files it only does one line
    grunt.log.writeln("Successfully converted "+(""+this.files.length).green +
                      " html templates to js.");
  });
};
