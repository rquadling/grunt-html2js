angular.module('templates-htmlmin', ['../test/fixtures/five.tpl.html']);

angular.module("../test/fixtures/five.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/five.tpl.html",
    "<div class=\"quotes should be escaped\"><span><span><span>Lorem ipsum</span></span></span></div>");
}]);
