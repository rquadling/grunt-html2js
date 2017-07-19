angular.module("templates-process_pug_custom", ["../test/fixtures/process_pug_custom.pug"]);

angular.module("../test/fixtures/process_pug_custom.pug", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_pug_custom.pug",
    "<a href>Great</a>");
}]);
