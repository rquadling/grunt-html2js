angular.module("templates-process_pug", ["../test/fixtures/process_pug.pug"]);

angular.module("../test/fixtures/process_pug.pug", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_pug.pug",
    "<p class=\"example\">Hello World!</p>\n" +
    "<div id=\"greeting\">Nice</div>");
}]);
