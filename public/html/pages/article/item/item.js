"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/article/item/:id', { //app首页
            templateUrl: 'pages/article/item/item.html',
            controller: "articleItemController"
        });
}]).controller('articleItemController', ['$scope', '$location', '$routeParams', 'ArticleSvc', function ($scope, $location, $routeParams, ArticleSvc) {
    $scope.apiPrefix = apiPrefix;
    $scope.id = $routeParams.id;

    $scope.getData = function () {
        ArticleSvc.items().then(function success(res) {
            $.each(res, function (index, item) {
                if (item.id + '' === $scope.id) {
                    $scope.article = item;
                    $.each(appMenus, function (index, item) {
                        if (item.id === $scope.article.menu.id) {
                            $scope.item = item;
                        }
                    });
                }
            })
        });
    };


    $scope.$watch('$routeParams', function (o, n) {
        $scope.getData();
    }, true);
}
]);



