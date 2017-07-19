angular.module("templates-single_module_strict", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("../test/fixtures/one.tpl.html",
    "1 2 3");
  $templateCache.put("../test/fixtures/three.tpl.html",
    "Multiple\n" +
    "Lines\n" +
    "");
}]);
