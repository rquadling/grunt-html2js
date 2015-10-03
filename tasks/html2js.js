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

  function isJadeTemplate(filepath) {
    var jadeExtension = /\.jade$/;
    return jadeExtension.test(filepath);
  }

  // return template content
  var getContent = function(filepath, options) {
    var content = grunt.file.read(filepath);
    if (isJadeTemplate(filepath)) {
      var jade = require('jade');
      options.jade.filename = filepath;
      content = jade.render(content, options.jade);
    }

    // Process files as templates if requested.
    var process = options.process;
    if (typeof process === "function") {
      content = process(content, filepath);
    } else if (process) {
      if (process === true) {
        process = {};
      }
      content = grunt.template.process(content, process);
    }

    if (Object.keys(options.htmlmin).length) {
      try {
        content = minify(content, options.htmlmin);
      } catch (err) {
        grunt.warn(filepath + '\n' + err);
      }
    }

    // trim leading whitespace
    content = content.replace(/(^\s*)/g, '');

    return escapeContent(content, options.quoteChar, options.indentString);
  };

  // compile a template to an angular module
  var compileTemplate = function(moduleName, filepath, options) {
    var quoteChar    = options.quoteChar;
    var indentString = options.indentString;
    var withModule   = !options.singleModule;
    var content      = getContent(filepath, options);
    var doubleIndent = indentString + indentString;
    var strict       = (options.useStrict) ? indentString + quoteChar + 'use strict' + quoteChar + ';\n' : '';
    var compiled = '';

    if (withModule) {
      compiled += 'angular.module(' + quoteChar + moduleName +
        quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', function($templateCache) {\n' + strict;
    }

    compiled += indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar +
      ',\n' + doubleIndent  + quoteChar +  content + quoteChar + ');';

    if (withModule) {
      compiled += '\n}]);\n';
    }

    return compiled;
  };

  // compile a template to an angular module
  var compileCoffeeTemplate = function(moduleName, filepath, options) {
    var quoteChar    = options.quoteChar;
    var indentString = options.indentString;
    var withModule   = !options.singleModule;
    var content = getContent(filepath, options);
    var doubleIndent = indentString + indentString;
    var compiled = '';

    if (withModule) {
      compiled += 'angular.module(' + quoteChar + moduleName +
        quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', ($templateCache) ->\n';
    }

    compiled += indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar +
      ',\n' + doubleIndent  + quoteChar +  content + quoteChar + ')';

    if (withModule) {
      compiled += '\n])\n';
    }

    return compiled;
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
      process: false,
      jade: { pretty: true },
      singleModule: false,
      existingModule: false,
      watch: false,
      amd: false,
      amdPrefixString: "define(['angular'], function(angular){",
      amdSuffixString: "});"
    });

    var counter = 0;
    var target = this.target;

    if (options.watch) {
      var files = this.files;
      var fileCache = {};
      var chokidar = require('chokidar');
      var watcher = chokidar.watch().on('change', function(filepath) {
        // invalidate cache
        fileCache[filepath] = null;
        // regenerateModules
        files.forEach(generateModule);
      });
    }

    // generate a separate module
    function generateModule(f) {

      // f.dest must be a string or write will fail
      var moduleNames = [];
      var filePaths = f.src.filter(existsFilter);

      if (options.watch) {
        watcher.add(filePaths);
      }

      var modules = filePaths.map(function(filepath) {

        var moduleName = normalizePath(path.relative(options.base, filepath));
        if (grunt.util.kindOf(options.rename) === 'function') {
          moduleName = options.rename(moduleName);
        }
        moduleNames.push("'" + moduleName + "'");

        var compiled;

        if (options.watch && (compiled = fileCache[filepath])) {
          // return compiled file contents from cache
          return compiled;
        }

        if (options.target === 'js') {
          compiled = compileTemplate(moduleName, filepath, options);
        } else if (options.target === 'coffee') {
          compiled = compileCoffeeTemplate(moduleName, filepath, options);
        } else {
          grunt.fail.fatal('Unknow target "' + options.target + '" specified');
        }

        if (options.watch) {
          // store compiled file contents in cache
          fileCache[filepath] = compiled;
        }

        return compiled;
      });

      counter += modules.length;
      modules  = modules.join('\n');

      var fileHeader = options.fileHeaderString !== '' ? options.fileHeaderString + '\n' : '';
      var fileFooter = options.fileFooterString !== '' ? options.fileFooterString + '\n' : '';
      var bundle = "";
      var targetModule = f.module || options.module;
      var indentString = options.indentString;
      var quoteChar    = options.quoteChar;
      var strict       = (options.useStrict) ? indentString + quoteChar + 'use strict' + quoteChar + ';\n' : '';
      var amdPrefix = "";
      var amdSuffix = "";
      // If options.module is a function, use that to get the targetModule
      if (grunt.util.kindOf(targetModule) === 'function') {
        targetModule = targetModule(f, target);
      }

      if (options.amd) {
        amdPrefix = options.amdPrefixString;
        amdSuffix = options.amdSuffixString;
      }

      if (!targetModule && options.singleModule) {
        throw new Error("When using singleModule: true be sure to specify a (target) module");
      }

      if (options.existingModule && !options.singleModule) {
        throw new Error("When using existingModule: true be sure to set singleModule: true");
      }

      if (options.singleModule) {
        var moduleSuffix = options.existingModule ? "" : ", []";
        if (options.target === 'js') {
          bundle = "angular.module('" + targetModule + "'" + moduleSuffix + ").run(['$templateCache', function($templateCache) {\n" + strict;
          modules += '\n}]);\n';
        } else if (options.target === 'coffee') {
          bundle = "angular.module('" + targetModule + "'" + moduleSuffix + ").run(['$templateCache', ($templateCache) ->\n";
          modules += '\n])\n';
        }
      } else if (targetModule) {
        //Allow a 'no targetModule if module is null' option
        bundle = "angular.module('" + targetModule + "', [" + moduleNames.join(', ') + "])";
        if (options.target === 'js') {
          bundle += ';';
        }

        bundle += "\n\n";
      }
      grunt.file.write(f.dest, grunt.util.normalizelf(fileHeader + amdPrefix + bundle + modules + amdSuffix + fileFooter));
    }

    this.files.forEach(generateModule);

    //Just have one output, so if we making thirty files it only does one line
    grunt.log.writeln("Successfully converted "+(""+counter).green +
                      " html templates to " + options.target + ".");
  });
};
