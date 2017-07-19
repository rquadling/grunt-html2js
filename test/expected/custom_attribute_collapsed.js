angular.module("templates-custom_attribute_collapsed", ["../test/fixtures/custom_attribute_collapse.tpl.html"]);

angular.module("../test/fixtures/custom_attribute_collapse.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/custom_attribute_collapse.tpl.html",
    "<div my-style=\"background-color: red;font-size: large;\"></div>\n" +
    "");
}]);
