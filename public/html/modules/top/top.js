'use strict';

app.directive('ngTop', ['$location', '$rootScope', function ($location, $rootScope) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/top/top.html',
        link: function (scope, element, attrs) {
            $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态

            });
        }
    };
}]);
