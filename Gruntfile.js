/*
 * grunt-html2js
 * https://github.com/karlgoldstein/grunt-html2js
 *
 * Copyright (c) 2013 Karl Goldstein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ]
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    // See https://github.com/gruntjs/grunt/wiki/Configuring-tasks
    // for configuration options that need to be tested
    html2js: {

      regex_in_template: {
        src: ['test/fixtures/pattern.tpl.html'],
        dest: 'tmp/regex_in_template.js'
      },

      compact_format_default_options: {
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/compact_format_default_options.js'
      },

      files_object_default_options: {
        files: {
          'tmp/files_object_default_options_1.js': ['test/fixtures/one.tpl.html'],
          'tmp/files_object_default_options_2.js': ['test/fixtures/two.tpl.html']
        }
      },

      files_array_default_options: {
        files: [
          {
            dest: 'tmp/files_array_default_options_1.js',
            src: ['test/fixtures/one.tpl.html']
          },
          {
            dest: 'tmp/files_array_default_options_2.js',
            src: ['test/fixtures/two.tpl.html']
          }
        ]
      },

      compact_format_custom_options: {
        options: {
          base: 'test',
          module: 'my-custom-template-module'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/compact_format_custom_options.js'
      },

      files_object_custom_options: {
        options: {
          base: 'test',
          module: 'my-custom-template-module'
        },
        files: {
          'tmp/files_object_custom_options_1.js': ['test/fixtures/one.tpl.html'],
          'tmp/files_object_custom_options_2.js': ['test/fixtures/two.tpl.html']
        }
      },

      files_array_custom_options: {
        options: {
          base: 'test',
          module: 'my-custom-template-module'
        },
        files: [
          {
            dest: 'tmp/files_array_custom_options_1.js',
            src: ['test/fixtures/one.tpl.html'],
            module: 'my-custom-templates'
          },
          {
            dest: 'tmp/files_array_custom_options_2.js',
            src: ['test/fixtures/two.tpl.html'],
            module: 'my-custom-templates'
          }
        ]
      },

      multi_lines: {
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/multi_lines.js'
      },

      double_quotes: {
        src: ['test/fixtures/four.tpl.html'],
        dest: 'tmp/double_quotes.js'
      },

      single_quotes: {
        options: {
          quoteChar: '\''
        },
        src: ['test/fixtures/four.tpl.html'],
        dest: 'tmp/single_quotes.js'
      },

      multi_lines_tabs: {
        options: {
          indentString: '\t'
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/multi_lines_tabs.js'
      },

      multi_lines_4space: {
        options: {
          indentString: '    '
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/multi_lines_4spaces.js'
      },

      file_header: {
        options: {
          fileHeaderString: '/* global angular: false */\n'
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/file_header.js'
      },

      rename: {
        options: {
          rename: function(moduleName) {
            return moduleName.replace('.html', '');
          }
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/rename.js'
      },

      module_as_function: {
        options: {
          module: function(file) {
            return "NAME_FROM_FUNCTION";
          }
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/module_as_function.js'
      },

      coffee: {
        options: {
          target: 'coffee'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/coffee.coffee'
      },

      strict_mode: {
        options: {
          useStrict: true
        },
        src: ['test/fixtures/one.tpl.html'],
        dest: 'tmp/strict_mode.js'
      },

      htmlmin: {
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        },
        src: ['test/fixtures/five.tpl.html'],
        dest: 'tmp/htmlmin.js'
      },

      process_template: {
        testMessages: {
          title: 'Main Title',
          subtitle: 'Subtitle with {{ interpolation }}'
        },
        options: {
          process: true
        },
        src: ['test/fixtures/process_template.tpl.html'],
        dest: 'tmp/process_template.js'
      },

      process_function: {
        options: {
          process: function(html, filePath) {
            html = html.replace('(ONE)', '1');
            html = html.replace('(TWO)', '2');
            html = html.replace('(THREE)', '3');
            return html;
          }
        },
        src: ['test/fixtures/process_function.tpl.html'],
        dest: 'tmp/process_function.js'
      },

      process_jade: {
        src: ['test/fixtures/process_jade.jade'],
        dest: 'tmp/process_jade.js'
      },

      process_jade_custom: {
        options: {
          jade: {doctype: 'html'}
        },
        src: ['test/fixtures/process_jade_custom.jade'],
        dest: 'tmp/process_jade_custom.js'
      },

      process_jade_with_include: {
        options: {
          jade: {}
        },
        src: ['test/fixtures/process_jade_with_include.jade'],
        dest: 'tmp/process_jade_with_include.js'
      },

      single_module: {
        options: {
          singleModule: true
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/three.tpl.html'],
        dest: 'tmp/single_module.js'
      },

      single_module_coffee: {
        options: {
          singleModule: true,
          target: 'coffee'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/three.tpl.html'],
        dest: 'tmp/single_module.coffee'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'html2js', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
