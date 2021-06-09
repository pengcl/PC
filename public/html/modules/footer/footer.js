'use strict';

app.directive('ngFooter', ['$location', function ($location) {
    return {
        restrict: 'C',
        scope: {
            contactHide: '='
        },
        templateUrl: 'modules/footer/footer.html',
        link: function (scope, element, attrs) {
            scope.apiPrefix = apiPrefix;
            scope.appConfig = appConfig;
            scope.appAddress = appAddress
        }
    };
}]);
