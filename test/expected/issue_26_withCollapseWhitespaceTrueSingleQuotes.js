angular.module('templates-issue_26_withCollapseWhitespaceTrueSingleQuotes', ['../test/fixtures/issue_26.tpl.html']);

angular.module('../test/fixtures/issue_26.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('../test/fixtures/issue_26.tpl.html',
    '<div>\n' +
    '    <div ng-class=\'"bsp-alert-" + (type || "warning")\'></div>\n' +
    '</div>\n' +
    '');
}]);
