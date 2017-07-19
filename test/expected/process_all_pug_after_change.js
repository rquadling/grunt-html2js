angular.module("templates-process_all_pug", ["../test/fixtures/process_pug.pug", "../test/fixtures/process_pug_custom.pug", "../test/fixtures/process_pug_with_include.pug", "../test/fixtures/pug_include.pug"]);

angular.module("../test/fixtures/process_pug.pug", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_pug.pug",
    "<p class=\"example\">Hello World!</p><div id=\"greeting\">Nice</div><div id=\"watch\">test</div>");
}]);

angular.module("../test/fixtures/process_pug_custom.pug", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_pug_custom.pug",
    "<a href=\"href\">Great</a>");
}]);

angular.module("../test/fixtures/process_pug_with_include.pug", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_pug_with_include.pug",
    "<h1>I'm an include!</h1>");
}]);

angular.module("../test/fixtures/pug_include.pug", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/pug_include.pug",
    "<h1>I'm an include!</h1>");
}]);
