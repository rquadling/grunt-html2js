angular.module('templates-process_jade', ['../test/fixtures/process_jade.jade']);

angular.module("../test/fixtures/process_jade.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_jade.jade",
    "<p class=\"example\">Hello World!</p>\n" +
    "<div id=\"greeting\">Nice</div>");
}]);
