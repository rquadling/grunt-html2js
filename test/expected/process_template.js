angular.module('templates-process_template', ['../test/fixtures/process_template.tpl.html']);

angular.module("../test/fixtures/process_template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_template.tpl.html",
    "<h1> Main Title </h1>\n" +
    "<h2> Subtitle with {{ interpolation }} </h2>\n" +
    "");
}]);
