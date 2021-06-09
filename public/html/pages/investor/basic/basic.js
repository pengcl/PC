"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/investor/basic/:id', { //app首页
            templateUrl: 'pages/investor/basic/basic.html',
            controller: "investorBasicController"
        });
}]).controller('investorBasicController', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.apiPrefix = apiPrefix;
    $scope.appConfig = appConfig;
    $scope.width=$(window).width();

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



