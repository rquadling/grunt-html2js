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
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    // See https://github.com/gruntjs/grunt/wiki/Configuring-tasks
    // for configuration options that need to be tested
    html2js: {
      compact_format_default_options: {
  src: ['test/fixtures/one.tpl.html', 'test/fixtures/two.tpl.html'],
  dest: 'tmp/compact_format_default_options.js'
      },
      files_object_default_options: {
        files: {
    'tmp/files_object_default_options_1.js' : ['test/fixtures/one.tpl.html'],
    'tmp/files_object_default_options_2.js' : ['test/fixtures/two.tpl.html']
  }
      },
      files_array_default_options: {
        files: [
    {
      dest : 'tmp/files_array_default_options_1.js',
      src : ['test/fixtures/one.tpl.html']
    },
    {
      dest: 'tmp/files_array_default_options_2.js',
      src : ['test/fixtures/two.tpl.html']
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
    'tmp/files_object_custom_options_1.js' : ['test/fixtures/one.tpl.html'],
    'tmp/files_object_custom_options_2.js' : ['test/fixtures/two.tpl.html']
  }
      },
      files_array_custom_options: {
        options: {
    base: 'test',
          module: 'my-custom-template-module'
        },
        files: [
    {
      dest : 'tmp/files_array_custom_options_1.js',
      src : ['test/fixtures/one.tpl.html'],
            module : 'my-custom-templates'
    },
    {
      dest: 'tmp/files_array_custom_options_2.js',
      src : ['test/fixtures/two.tpl.html'],
            module : 'my-custom-templates'
    }
  ]
      },
      multi_lines: {
	src: ['test/fixtures/three.tpl.html'],
	dest: 'tmp/multi_lines.js'
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'html2js', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
