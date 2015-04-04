angular.module('templates-process_all_jade', ['../test/fixtures/jade_include.jade', '../test/fixtures/process_jade.jade', '../test/fixtures/process_jade_custom.jade', '../test/fixtures/process_jade_with_include.jade']);

angular.module("../test/fixtures/jade_include.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/jade_include.jade",
    "<h1>I'm an include!</h1>");
}]);

angular.module("../test/fixtures/process_jade.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_jade.jade",
    "<p class=\"example\">Hello World!</p><div id=\"greeting\">Nice</div><div id=\"watch\">test</div>");
}]);

angular.module("../test/fixtures/process_jade_custom.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_jade_custom.jade",
    "<a href=\"href\">Great</a>");
}]);

angular.module("../test/fixtures/process_jade_with_include.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_jade_with_include.jade",
    "<h1>I'm an include!</h1>");
}]);
