angular.module('templates-process_jade_with_include', ['../test/fixtures/process_jade_with_include.jade']);

angular.module("../test/fixtures/process_jade_with_include.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_jade_with_include.jade",
    "<h1>I'm an include!</h1>");
}]);
