angular.module('templates-process_function', ['../test/fixtures/process_function.tpl.html']);

angular.module("../test/fixtures/process_function.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_function.tpl.html",
    "<h1> 1 </h1>\n" +
    "<h2> 2 </h2>\n" +
    "<h3> 3 </h3>\n" +
    "");
}]);
