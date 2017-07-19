angular.module("templates-custom_attribute_not_collapsed", ["../test/fixtures/custom_attribute_collapse.tpl.html"]);

angular.module("../test/fixtures/custom_attribute_collapse.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/custom_attribute_collapse.tpl.html",
    "<div\n" +
    "        my-style=\"\n" +
    "            background-color: red;\n" +
    "            font-size: large;\"\n" +
    "></div>\n" +
    "");
}]);
