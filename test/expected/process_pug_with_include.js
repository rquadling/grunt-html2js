angular.module("templates-process_pug_with_include", ["../test/fixtures/process_pug_with_include.pug"]);

angular.module("../test/fixtures/process_pug_with_include.pug", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_pug_with_include.pug",
    "<h1>I'm an include!</h1>");
}]);
