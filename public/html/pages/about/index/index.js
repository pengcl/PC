"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/about/index/:id', { //app首页
            templateUrl: 'pages/about/index/index.html',
            controller: "aboutIndexController"
        });
}]).controller('aboutIndexController', ['$scope', '$routeParams', '$location', 'MenuSvc', function ($scope, $routeParams, $location, MenuSvc) {
    $scope.id = $routeParams.id;
    $scope.apiPrefix = apiPrefix;

    $scope.getData = function () {
        $.each(appMenus, function (index, item) {
            if (item.id + '' === $scope.id) {
                $scope.item = item;
            }
        });
    };

    $scope.$watch('$routeParams', function (o, n) {
        $scope.getData();
    }, true);
}
]);



