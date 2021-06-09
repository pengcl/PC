"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/product/item/:id', { //app首页
            templateUrl: 'pages/product/item/item.html',
            controller: "productItemController"
        });
}]).controller('productItemController', ['$scope', '$location', '$routeParams', 'ArticleSvc', function ($scope, $location, $routeParams, ArticleSvc) {
    $scope.apiPrefix = apiPrefix;
    $scope.id = $routeParams.id;
    $scope.lan = lan

    $scope.getData = function () {
        $.each(appMenus, function (index, item) {
            if (item.id + '' === $scope.id) {
                $scope.item = item;
                ArticleSvc.items().then(function success(res) {
                    $.each(res, function (_index, _item) {
                        if (_item.menu.id + '' === $scope.id) {
                            $scope.article = _item
                        }
                    })
                });
            }
        });
    };


    $scope.$watch('$routeParams', function (o, n) {
        $scope.getData();
    }, true);
}
]);



