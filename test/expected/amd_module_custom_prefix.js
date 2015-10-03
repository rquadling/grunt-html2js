define(['ng'], function(angular){angular.module('templates-amd_module_custom_prefix', ['../test/fixtures/one.tpl.html', '../test/fixtures/two.tpl.html']);

angular.module("../test/fixtures/one.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/one.tpl.html",
    "1 2 3");
}]);

angular.module("../test/fixtures/two.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/two.tpl.html",
    "Testing");
}]);
});