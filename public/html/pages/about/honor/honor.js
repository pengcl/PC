"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/about/honor/:id', { //app首页
            templateUrl: 'pages/about/honor/honor.html',
            controller: "aboutHonorController"
        });
}]).controller('aboutHonorController', ['$scope', '$routeParams', '$location', 'MenuSvc', function ($scope, $routeParams, $location, MenuSvc) {
    $scope.apiPrefix = apiPrefix;

    $scope.getData = function () {
        $scope.id = $routeParams.id;
        var list = [];
        $.each(JSON.parse(JSON.stringify(appMenus)), function (index, item) {
            if (item.id + '' === $scope.id) {
                $scope.item = item;
                $.each($scope.item.poster, function (i, _item) {
                    if (_item.url) {
                        _item.url = apiPrefix + _item.url;
                        list.push(_item.url)
                    }
                });
                $scope.imgs = list
            }
        });
    };

    $scope.$watch('$routeParams', function (o, n) {
        $scope.getData();
    }, true);

    $scope.$on("$destroy", function ($destroy) {
        $scope.imgs = []
    });

}
]);



