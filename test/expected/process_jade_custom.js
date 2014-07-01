angular.module('templates-process_jade_custom', ['../test/fixtures/process_jade_custom.jade']);

angular.module("../test/fixtures/process_jade_custom.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/process_jade_custom.jade",
    "<a href>Great</a>");
}]);
