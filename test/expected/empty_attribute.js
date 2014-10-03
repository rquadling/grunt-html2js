angular.module('templates-empty_attribute', ['../test/fixtures/empty_attribute.tpl.html']);

angular.module("../test/fixtures/empty_attribute.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/empty_attribute.tpl.html",
    "<div ui-view></div>\n" +
    "");
}]);
