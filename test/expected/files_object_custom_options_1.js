angular.module("my-custom-template-module", ["fixtures/one.tpl.html"]);

angular.module("fixtures/one.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fixtures/one.tpl.html",
    "1 2 3");
}]);
