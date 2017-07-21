angular.module("templates-bug_26_withCollapseWhitespaceTrueDoubleQuotes", ["../test/fixtures/bug_26.tpl.html"]);

angular.module("../test/fixtures/bug_26.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/bug_26.tpl.html",
    "<div>\n" +
    "    <div ng-class='\"bsp-alert-\" + (type || \"warning\")'></div>\n" +
    "</div>\n" +
    "");
}]);
