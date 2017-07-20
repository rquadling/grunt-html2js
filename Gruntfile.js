/*
 * grunt-html2js
 * https://github.com/rquadling/grunt-html2js
 *
 * Copyright (c) 2013 Karl Goldstein
 * Copyright (c) 2017 Richard Quadling
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    coveralls: {
      // Options relevant to all targets
      options: {
        // When true, grunt-coveralls will only print a warning rather than
        // an error, to prevent CI builds from failing unnecessarily (e.g. if
        // coveralls.io is down). Optional, defaults to false.
        force: false
      },

      html2js: {
        // LCOV coverage file (can be string, glob or array)
        src: 'coverage/lcov.info',
        options: {
          // Any options for just this target
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    // See https://github.com/gruntjs/grunt/wiki/Configuring-tasks
    // for configuration options that need to be tested
    html2js: {
      amd_module: {
        options: {
          amd: true,
          quoteChar: '\''
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/amd_module.js'
      },
      amd_module_custom_prefix: {
        options: {
          amd: true,
          amdPrefixString: 'define([\'ng\'], function(angular){'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/amd_module_custom_prefix.js'
      },
      amd_module_custom_suffix: {
        options: {
          amd: true,
          amdSuffixString: '}); //Custom!'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/amd_module_custom_suffix.js'
      },
      broken_newlines: {
        src: ['test/fixtures/broken_newlines.tpl.html'],
        dest: 'tmp/broken_newlines.js'
      },
      coffee: {
        options: {
          target: 'coffee'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/coffee.coffee'
      },
      compact_format_custom_options: {
        options: {
          base: 'test',
          module: 'my-custom-template-module'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/compact_format_custom_options.js'
      },
      compact_format_default_options: {
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/compact_format_default_options.js'
      },
      custom_attribute_collapsed: {
        src: ['test/fixtures/custom_attribute_collapse.tpl.html'],
        dest: 'tmp/custom_attribute_collapsed.js',
        options: {
          htmlmin: {
            customAttrCollapse: /my-[a-z]*/
          }
        }
      },
      custom_attribute_not_collapsed: {
        src: ['test/fixtures/custom_attribute_collapse.tpl.html'],
        dest: 'tmp/custom_attribute_not_collapsed.js'
      },
      double_quotes: {
        src: ['test/fixtures/four.tpl.html'],
        dest: 'tmp/double_quotes.js'
      },
      empty_attribute: {
        src: ['test/fixtures/empty_attribute.tpl.html'],
        dest: 'tmp/empty_attribute.js'
      },
      empty_module: {
        src: [],
        dest: 'tmp/empty_module.js'
      },
      existing_module: {
        options: {
          singleModule: true,
          existingModule: true
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/three.tpl.html'],
        dest: 'tmp/existing_module.js'
      },
      file_footer: {
        options: {
          fileFooterString: '/* Module End */\n'
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/file_footer.js'
      },
      file_header: {
        options: {
          fileHeaderString: '/* Module Start */\n'
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/file_header.js'
      },
      file_header_footer: {
        options: {
          fileHeaderString: '/* Module Start */\n',
          fileFooterString: '/* Module End */\n'
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/file_header_footer.js'
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
      files_object_default_options: {
        files: {
          'tmp/files_object_default_options_1.js': ['test/fixtures/one.tpl.html'],
          'tmp/files_object_default_options_2.js': ['test/fixtures/two.tpl.html']
        }
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
      module_as_function: {
        options: {
          module: function (file) {
            return 'NAME_FROM_FUNCTION';
          }
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/module_as_function.js'
      },
      multi_lines: {
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/multi_lines.js'
      },
      multi_lines_4space: {
        options: {
          indentString: '    '
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/multi_lines_4spaces.js'
      },
      multi_lines_tabs: {
        options: {
          indentString: '\t'
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/multi_lines_tabs.js'
      },
      process_all_pug: {
        options: {
          pug: {},
          watch: true
        },
        src: ['test/fixtures/*.pug'],
        dest: 'tmp/process_all_pug.js'
      },
      process_function: {
        options: {
          process: function (html, filePath) {
            html = html.replace('(ONE)', '1');
            html = html.replace('(TWO)', '2');
            html = html.replace('(THREE)', '3');
            return html;
          }
        },
        src: ['test/fixtures/process_function.tpl.html'],
        dest: 'tmp/process_function.js'
      },
      process_pug: {
        src: ['test/fixtures/process_pug.pug'],
        dest: 'tmp/process_pug.js'
      },
      process_pug_custom: {
        options: {
          pug: {doctype: 'html'}
        },
        src: ['test/fixtures/process_pug_custom.pug'],
        dest: 'tmp/process_pug_custom.js'
      },
      process_pug_with_include: {
        options: {
          pug: {}
        },
        src: ['test/fixtures/process_pug_with_include.pug'],
        dest: 'tmp/process_pug_with_include.js'
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
      regex_in_template: {
        src: ['test/fixtures/pattern.tpl.html'],
        dest: 'tmp/regex_in_template.js'
      },
      rename: {
        options: {
          rename: function (moduleName) {
            return moduleName.replace('.html', '');
          }
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
        dest: 'tmp/rename.js'
      },
      single_module: {
        options: {
          singleModule: true
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/three.tpl.html'],
        dest: 'tmp/single_module.js'
      },
      single_module_strict: {
        options: {
          singleModule: true,
          useStrict: true
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/three.tpl.html'],
        dest: 'tmp/single_module_strict.js'
      },
      single_module_coffee: {
        options: {
          singleModule: true,
          target: 'coffee'
        },
        src: ['test/fixtures/one.tpl.html', 'test/fixtures/three.tpl.html'],
        dest: 'tmp/single_module.coffee'
      },
      single_quotes: {
        options: {
          quoteChar: '\''
        },
        src: ['test/fixtures/four.tpl.html'],
        dest: 'tmp/single_quotes.js'
      },
      strict_mode: {
        options: {
          useStrict: true
        },
        src: ['test/fixtures/one.tpl.html'],
        dest: 'tmp/strict_mode.js'
      },
      template_path_in_comment: {
        options: {
          templatePathInComment: true
        },
        src: ['test/fixtures/three.tpl.html'],
        dest: 'tmp/template_path_in_comment.js'
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

  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'html2js', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
