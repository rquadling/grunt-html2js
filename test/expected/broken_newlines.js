angular.module("templates-broken_newlines", ["../test/fixtures/broken_newlines.tpl.html"]);

angular.module("../test/fixtures/broken_newlines.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/broken_newlines.tpl.html",
    "abc\n" +
    "def");
}]);
