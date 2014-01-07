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
  var minify = require('html-minifier').minify;

  var escapeContent = function(content, quoteChar, indentString) {
    var bsRegexp = new RegExp('\\\\', 'g');
    var quoteRegexp = new RegExp('\\' + quoteChar, 'g');
    var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar;
    return content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace);
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

  // return template content
  var getContent = function(filepath, quoteChar, indentString, htmlmin, process) {
    var content = grunt.file.read(filepath);

    // Process files as templates if requested.
    if (typeof process === "function") {
      content = process(content, filepath);
    } else if (process) {
      if (process === true) {
        process = {};
      }
      content = grunt.template.process(content, process);
    }

    if (Object.keys(htmlmin).length) {
      try {
        content = minify(content, htmlmin);
      } catch (err) {
        grunt.warn(filepath + '\n' + err);
      }
    } 

    return escapeContent(content, quoteChar, indentString);
  };

  // compile a template to an angular module
  var compileTemplate = function(moduleName, filepath, quoteChar, indentString, useStrict, htmlmin, process) {

    var content = getContent(filepath, quoteChar, indentString, htmlmin, process);
    var doubleIndent = indentString + indentString;
    var strict = (useStrict) ? indentString + quoteChar + 'use strict' + quoteChar + ';\n' : '';

    var module = 'angular.module(' + quoteChar + moduleName +
      quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', function($templateCache) ' +
      '{\n' + strict + indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
       quoteChar + ');\n}]);\n';

    return module;
  };

  // compile a template to an angular module
  var compileCoffeeTemplate = function(moduleName, filepath, quoteChar, indentString, htmlmin, process) {
    var content = getContent(filepath, quoteChar, indentString, htmlmin, process);
    var doubleIndent = indentString + indentString;

    var module = 'angular.module(' + quoteChar + moduleName +
      quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', ($templateCache) ->\n' +
      indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
      quoteChar + ')\n])\n';

    return module;
  };

  grunt.registerMultiTask('html2js', 'Compiles Angular-JS templates to JavaScript.', function() {

    var options = this.options({
      base: 'src',
      module: 'templates-' + this.target,
      quoteChar: '"',
      fileHeaderString: '',
      fileFooterString: '',
      indentString: '  ',
      target: 'js',
      htmlmin: {},
      process: false
    });

    var counter = 0;

    // generate a separate module
    this.files.forEach(function(f) {

      // f.dest must be a string or write will fail

      var moduleNames = [];

      var modules = f.src.filter(existsFilter).map(function(filepath) {

        var moduleName = normalizePath(path.relative(options.base, filepath));
        if (grunt.util.kindOf(options.rename) === 'function') {
          moduleName = options.rename(moduleName);
        }
        moduleNames.push("'" + moduleName + "'");
        if (options.target === 'js') {
          return compileTemplate(moduleName, filepath, options.quoteChar, options.indentString, options.useStrict, options.htmlmin, options.process);
        } else if (options.target === 'coffee') {
          return compileCoffeeTemplate(moduleName, filepath, options.quoteChar, options.indentString, options.htmlmin, options.process);
        } else {
          grunt.fail.fatal('Unknow target "' + options.target + '" specified');
        }

      });

      counter += modules.length;
      modules  = modules.join('\n');

      var fileHeader = options.fileHeaderString !== '' ? options.fileHeaderString + '\n' : '';
      var fileFooter = options.fileFooterString !== '' ? options.fileFooterString + '\n' : '';
      var bundle = "";
      var targetModule = f.module || options.module;
      // If options.module is a function, use that to get the targetModule
      if (grunt.util.kindOf(targetModule) === 'function') {
	targetModule = targetModule(f);
      }
      //Allow a 'no targetModule if module is null' option
      if (targetModule) {
        bundle = "angular.module('" + targetModule + "', [" + moduleNames.join(', ') + "])";
        if (options.target === 'js') {
          bundle += ';';
        }

        bundle += "\n\n";
      }
      grunt.file.write(f.dest, grunt.util.normalizelf(fileHeader + bundle + modules + fileFooter));
    });
    //Just have one output, so if we making thirty files it only does one line
    grunt.log.writeln("Successfully converted "+(""+counter).green +
                      " html templates to " + options.target + ".");
  });
};
