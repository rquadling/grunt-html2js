# grunt-html2js

> Converts AngularJS templates to JavaScript

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html2js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html2js');
```

## The "html2js" task

### Overview

Angular-JS normally loads templates lazily from the server as you reference them in your application (via `ng-include`, routing configuration or other mechanism).  Angular caches the source code for each template so that subsequent references do not require another server request.  However, if your application is divided into many small components, then the initial loading process may involve an unacceptably large number of additional server requests.

This plugin converts a group of templates to JavaScript and assembles them into an Angular module that primes the cache directly when the module is loaded.  You can concatenate this module with your main application code so that Angular does not need to make any additional server requests to initialize the application.

Note that this plugin does *not* compile the templates.  It simply caches the template source code.

### Setup

By default, this plugin assumes you are following the naming conventions and build pipeline of the [angular-app](https://github.com/angular-app/angular-app) demo application.

In your project's Gruntfile, add a section named `html2js` to the data object passed into `grunt.initConfig()`.

This simplest configuration will assemble all templates in your src tree into a module named `templates-main`, and write the JavaScript source for the module to `tmp/template.js`:

```js
grunt.initConfig({
  html2js: {
    options: {
      // custom options, see below
    },
    main: {
      src: ['src/**/*.tpl.html'],
      dest: 'tmp/templates.js'
    },
  },
})
```

Assuming you concatenate the resulting file with the rest of your application code, you can then specify the module as a dependency in your code:

```
angular.module('main', ['templates-main'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/somepath', {
      templateUrl:'some/template.tpl.html',
```

Note that you should use relative paths to specify the template URL, to
match the keys by which the template source is cached.

### Gotchas

The `dest` property must be a string.  If it is an array, Grunt will fail when attempting to write the bundle file.

### Options

#### options.base
Type: `String`
Default value: `'src'`

The prefix relative to the project directory that should be stripped from each template path to produce a module identifier for the template.  For example, a template located at `src/projects/projects.tpl.html` would be identified as just `projects/projects.tpl.html`.

#### options.target
Type: `String`
Default value: `'js'`

Language of the output file. Possible values: `'coffee'`, `'js'`.

#### options.module
Type: `String` or `Function`
Default value: `templates-TARGET`

The name of the parent Angular module for each set of templates.  Defaults to the task target prefixed by `templates-`.

The value of this argument can be a string or a function.  The function should expect the module file path and grunt task name as arguments, and it should return the name to use for the parent Angular module.

If no bundle module is desired, set this to false.

#### options.rename
Type: `Function`
Default value: `none`

A function that takes in the module identifier and returns the renamed module identifier to use instead for the template.  For example, a template located at `src/projects/projects.tpl.html` would be identified as `/src/projects/projects.tpl` with a rename function defined as:

```
function (moduleName) {
  return '/' + moduleName.replace('.html', '');
}
```

#### options.quoteChar
Type: `Character`
Default value: `"`

Strings are quoted with double-quotes by default.  However, for projects
that want strict single quote-only usage, you can specify:

```
options: { quoteChar: '\'' }
```

to use single quotes, or any other odd quoting character you want

#### indentString
Type: `String`
Default value: `  `

By default a 2-space indent is used for the generated code. However,
you can specify alternate indenting via:

```
options: { indentString: '    ' }
```

to get, for example, 4-space indents. Same goes for tabs or any other
indent system you want to use.

#### fileHeaderString:
Type: `String`
Default value: ``

If specified, this string  will get written at the top of the output
Template.js file. As an example, jshint directives such as
/* global angular: false */ can be put at the head of the file.

#### fileFooterString:
Type: `String`
Default value: ``

If specified, this string  will get written at the end of the output
file.  May be used in conjunction with `fileHeaderString` to wrap
the output.

#### useStrict:
Type: `Boolean`
Default value: ``

If set true, each module in JavaScript will have 'use strict'; written at the top of the
module.  Useful for global strict jshint settings.

```
options: { useStrict: true }
```

#### htmlmin:
Type: `Object`
Default value: {}

Minifies HTML using [html-minifier](https://github.com/kangax/html-minifier).

```
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
}
```

In addition, the `customAttrCollapse` option is supported, allowing you to supply a regex that
is used to match attribute names in which multiple whitespace will be collapsed to a single space.

#### process:
Type: `Object` or `Boolean` or `Function`
Default value: `false`

Performs arbitrary processing on the template as part of the compilation process.

Option value can be one of:

1. a function that accepts `content` and `filepath` as arguments, and returns the transformed content
2. an object that is passed as the second options argument to `grunt.template.process` (with the file content as the first argument)
3.  `true` to call `grunt.template.process` with the content and no options

#### singleModule
Type: `Boolean`
Default value: `false`

If set to true, will create a single wrapping module with a run block, instead of an individual module for each template file. Requires that the `module` option is not falsy.

#### existingModule
Type: `Boolean`
Default value: `false`

If set to true, will use an existing module with the name from `module`, instead of creating a new module. Requires that `singleModule` is not falsy.

#### watch
Type: `Boolean`
Default value: `false`

If set to true and used in conjunction with a long running/keep-alive process such as grunt-contrib-watch html2js will watch src files for changes and regenerate output to dest. It uses an internal cache so only the file that changes needs to be re-compliled. Useful for development process particularly if you have lots of jade templates. It is very similar to grunt-browserify's watch.

N.B. If using grunt-watch you do not need to run the html2js task again on src changes as it watches internally for these. All you need to do is watch the destination file and live reload on change.

#### amd
Type: `Boolean`
Default value: `false`

If set to true, will wrap output in a define block so it is compatible with AMD module loaders such as RequireJS without requiring you to shim the module.

#### amdPrefixString
Type: `String`
Default value: `define(['angular'], function(angular){\n`

When `options.amd` is set to true, this is what will be prepended to the module to make it compatible with AMD module loaders.  Along with `amdSuffixString`, these two options should allow you to customize the way your AMD module is created.

#### amdSuffixString
Type: `String`
Default Value: `});`

When `options.amd` is set to true, this is what will be postpended to the module to make it compatible with AMD module loaders.  Along with `amdPrefixString`, these two options should allow you to customize the way your AMD module is created.


```
options: {
  jade: {},
  watch: true
}
```

### Jade support

If template filename ends with `.jade` the task will automatically render file's content using [Jade](https://github.com/visionmedia/jade)
then compile into JS.

Options can be passed to Jade within a `jade` property in the plugin options.

```
options: {
  jade: {
    //this prevents auto expansion of empty arguments
    //e.g. "div(ui-view)" becomes "<div ui-view></div>"
    //     instead of "<div ui-view="ui-view"></div>"
    doctype: "html"
  }
}
```

### Usage Examples

See the `Gruntfile.js` in the project source code for various configuration examples.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.1.1 Build module even if templates do not exist yet

0.1.2 Preserve line feeds in templates to avoid breaking &lt;pre>-formatted text

0.1.3 Add option to set the `module` option to null to disable creation of bundle module

0.1.4 Add rename option

0.1.5 Add config options for quoteChar, indentString and fileHeaderString (thanks @jonathana)

0.1.6 Add support for CoffeeScript (thanks @srigi)

0.1.7 Escape backslashes in template source (issue #11, thanks @JoakimBe)

0.1.8 Add fileFooterString option (issue #13, thanks @duro)

0.1.9 Add useStrict option (pull request #15, thanks @marcoose)

0.2.0 Add htmlmin option (pull request #16, thanks @buberdds)

0.2.1 Fix dependencies for htmlmin (pull request #17, vielen dank @mlegenhausen)

0.2.2 Fix counter of converted files (pull request #18, thanks @srigi)

0.2.3 Add option to interpret 'module' as function (pull request #20, thanks @CodingGorilla)

0.2.4 Add `process` option (pull request #24, thanks @scottrippey)

0.2.5 Add task name as argument to function variant of module option (pull request #37, thanks @lukovnikov)

0.2.6 Add support for auto-detecting Jade templates as input (thanks @bahmutov)

0.2.7 Add singleModule module for placing all templates in a single module (PR #43, thanks @janeklb)

0.2.8 Allow passing option to Jade templates (PR #46, thanks @NickClark)

0.2.9 Support relative file names for Jade templates (PR #48, thanks @dvonlehman)

0.3.0 Allow use strict in single mode (PR #58, thanks @mfeckie)

0.3.1 Add watch feature (PR #67, thanks @startswithaj)

0.3.2 Update to stable chokidar (PR #68, thanks @paulmillr)

0.3.3 Fix dependency on jade (PR #72, thanks @mathewleon)

0.3.4 Add existingModule option (PR #75, thanks @Jandalf)

0.3.5 Adds options to support AMD modules (PR #75, thanks @Southpaw17)

0.3.6 Updates peer dependencies for Grunt 1.0 (PR #81)

0.3.7 Fix dependencies for htmlmin

As of 0.3.7, this package is now administered by Richard Quadling who gives a big "Thank you" to Karl for his hard work.

0.3.8 Fix broken newlines (\r\r\n)
