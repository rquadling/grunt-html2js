angular.module("templates-template_path_in_comment", ["../test/fixtures/three.tpl.html"]);

angular.module("../test/fixtures/three.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/three.tpl.html",
    "<!-- template: test/fixtures/three.tpl.html -->\n" +
    "Multiple\n" +
    "Lines\n" +
    "");
}]);
