'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var strContext = function (s, pos, size) {
    var start = pos - size > 0 ? pos - size : 0;
    var end = pos + size < s.length ? pos + size : pos.length;
    return s.substring(start, end);
};

var assertFileContentsEqual = function (test, actualFile, expectedFile, message) {

    var actual = grunt.file.read(actualFile);
    var expected = grunt.util.normalizelf(grunt.file.read(expectedFile));

    var i, pos = null;
    for (i = 0; i < expected.length - 1; i++) {
        if (actual.charAt(i) !== expected.charAt(i)) {
            pos = i;
            break;
        }
    }
    if (pos !== null) {
        message += " at character " + i + ": " + strContext(actual, pos, 5);
    }

    test.equal(actual, expected, message);
};

exports.html2js = {

    setUp: function (done) {
        // setup here if necessary
        done();
    },

    regex_in_template: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/regex_in_template.js',
            'test/expected/regex_in_template.js',
            'expected compiled template module');

        test.done();
    },
    empty_attribute: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/empty_attribute.js',
            'test/expected/empty_attribute.js',
            'expected compiled template module');

        test.done();
    },
    compact_format_default_options: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/compact_format_default_options.js',
            'test/expected/compact_format_default_options.js',
            'expected compiled template module');

        test.done();
    },
    files_object_default_options: function (test) {

        test.expect(2);

        assertFileContentsEqual(test, 'tmp/files_object_default_options_1.js',
            'test/expected/files_object_default_options_1.js',
            'expected compiled template module');

        assertFileContentsEqual(test, 'tmp/files_object_default_options_2.js',
            'test/expected/files_object_default_options_2.js',
            'expected compiled template module');

        test.done();
    },
    files_array_default_options: function (test) {

        test.expect(2);

        assertFileContentsEqual(test, 'tmp/files_array_default_options_1.js',
            'test/expected/files_array_default_options_1.js',
            'expected compiled template module');

        assertFileContentsEqual(test, 'tmp/files_array_default_options_2.js',
            'test/expected/files_array_default_options_2.js',
            'expected compiled template module');

        test.done();
    },
    compact_format_custom_options: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/compact_format_custom_options.js',
            'test/expected/compact_format_custom_options.js',
            'expected compiled template module');

        test.done();
    },
    files_object_custom_options: function (test) {

        test.expect(2);

        assertFileContentsEqual(test, 'tmp/files_object_custom_options_1.js',
            'test/expected/files_object_custom_options_1.js',
            'expected compiled template module');

        assertFileContentsEqual(test, 'tmp/files_object_custom_options_2.js',
            'test/expected/files_object_custom_options_2.js',
            'expected compiled template module');

        test.done();
    },
    files_array_custom_options: function (test) {

        test.expect(2);

        assertFileContentsEqual(test, 'tmp/files_array_custom_options_1.js',
            'test/expected/files_array_custom_options_1.js',
            'expected compiled template module');

        assertFileContentsEqual(test, 'tmp/files_array_custom_options_2.js',
            'test/expected/files_array_custom_options_2.js',
            'expected compiled template module');

        test.done();
    },
    multi_lines: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/multi_lines.js',
            'test/expected/multi_lines.js',
            'expected compiled template module');

        test.done();
    },
    multi_lines_4spaces: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/multi_lines_4spaces.js',
            'test/expected/multi_lines_4spaces.js',
            'expected compiled template module');

        test.done();
    },
    multi_lines_tabs: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/multi_lines_tabs.js',
            'test/expected/multi_lines_tabs.js',
            'expected compiled template module');

        test.done();
    },
    double_quotes: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/double_quotes.js',
            'test/expected/double_quotes.js',
            'expected compiled template module');

        test.done();
    },
    single_quotes: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/single_quotes.js',
            'test/expected/single_quotes.js',
            'expected compiled template module');

        test.done();
    },
    file_header: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/file_header.js',
            'test/expected/file_header.js',
            'expected compiled template module');

        test.done();
    },
    rename: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/rename.js',
            'test/expected/rename.js',
            'expected compiled template module');

        test.done();
    },
    module_as_function: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/module_as_function.js',
            'test/expected/module_as_function.js',
            'expected compiled template module');

        test.done();
    },
    coffee: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/coffee.coffee',
            'test/expected/coffee.coffee',
            'expected compiled template module');

        test.done();
    },
    strict_mode: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/strict_mode.js',
            'test/expected/strict_mode.js',
            'expected strict mode in templates');

        test.done();
    },
    htmlmin: function (test) {

        test.expect(1);

        assertFileContentsEqual(test, 'tmp/htmlmin.js',
            'test/expected/htmlmin.js',
            'expected minified template');

        test.done();
    },
    process_template: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/process_template.js',
            'test/expected/process_template.js',
            'expected grunt templates to be processed');

        test.done();
    },
    process_function: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/process_function.js',
            'test/expected/process_function.js',
            'expected grunt templates to be processed by a custom function');

        test.done();
    },
    process_jade: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/process_jade.js',
            'test/expected/process_jade.js',
            'expected jade template to be processed');

        test.done();
    },
    process_jade_with_custom_options: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/process_jade_custom.js',
            'test/expected/process_jade_custom.js',
            'expected jade template to be processed with custom options');

        test.done();
    },
    process_jade_with_include: function (test) {
        test.expect(1);
        assertFileContentsEqual(test, 'tmp/process_jade_with_include.js',
            'test/expected/process_jade_with_include.js',
            'expected jade template to be processed with custom options');

        test.done();
    },
    process_all_jade: function (test) {
        test.expect(1);

        // This test is run with options.watch on
        // We need to edit a fixture file to make sure it is watched and re-compiled
        var file2Change = 'test/fixtures/process_jade.jade';
        var contents = grunt.file.read(file2Change);
        var newContents = contents + "\n#watch test";

        // Write edited fixture file
        grunt.file.write(file2Change, grunt.util.normalizelf(newContents));

        // wait for the watch-change to process
        setTimeout(function () {
            // Check re-compiled with changes were added
            assertFileContentsEqual(test, 'tmp/process_all_jade.js',
                'test/expected/process_all_jade_after_change.js',
                'expected jade template to be processed with custom options');

            //reset fixture file to original contents
            grunt.file.write(file2Change, grunt.util.normalizelf(contents));
            test.done();
        }, 1000);

    },
    single_module: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/single_module.js',
            'test/expected/single_module.js',
            'expected template with single module');

        test.done();
    },
    single_module_coffee: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/single_module.coffee',
            'test/expected/single_module.coffee',
            'expected coffee template with single module');

        test.done();

    },
    existing_module: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/existing_module.js',
            'test/expected/existing_module.js',
            'expected use of existing module');

        test.done();

    },
    amd_module: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/amd_module.js',
            'test/expected/amd_module.js',
            'expected use of amd module');

        test.done();
    },
    amd_module_custom_prefix: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/amd_module_custom_prefix.js',
            'test/expected/amd_module_custom_prefix.js',
            'expected use of amd module with custom prefix');

        test.done();
    },
    amd_module_custom_suffix: function (test) {
        test.expect(1);

        assertFileContentsEqual(test, 'tmp/amd_module_custom_suffix.js',
            'test/expected/amd_module_custom_suffix.js',
            'expected use of amd module with custom suffix');

        test.done();
    }
};
