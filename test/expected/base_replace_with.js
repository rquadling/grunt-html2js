angular.module('templates-process_with_replace_option', ['templates/one.tpl.html']);

angular.module("templates/one.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/one.tpl.html",
    "1 2 3");
}]);
