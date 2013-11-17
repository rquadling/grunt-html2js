angular.module('templates-htmlmin', ['../test/fixtures/five.tpl.html']);

angular.module("../test/fixtures/five.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/five.tpl.html",
    "<div><span><span><span>Lorem ipsum</span></span></span></div>");
}]);
