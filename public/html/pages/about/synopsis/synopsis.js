"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/about/synopsis/:id', { //app首页
            templateUrl: 'pages/about/synopsis/synopsis.html',
            controller: "aboutSynopsisController"
        });
}]).controller('aboutSynopsisController', ['$scope', '$routeParams', '$location', 'MenuSvc', function ($scope, $routeParams, $location, MenuSvc) {
    $scope.id = $routeParams.id;
    $scope.apiPrefix = apiPrefix;

    function testAnim(elem, x) {
        $(elem).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated');
        });
    }

    $scope.getData = function () {
        $.each(appMenus, function (index, item) {
            if (item.id + '' === $scope.id) {
                $scope.item = item;

            }
        });
    };

    $(document).ready(function () {
        var a, b, c, c2;
        var isFirst = true;
        var _isFirst = true;
        a = $(window).height();    //浏览器窗口高度
        var group = $(".synopsis");
        var group2 = $(".status-list-a");
        $(window).scroll(function () {
            b = $(this).scrollTop();   //页面滚动的高度
            c = group.offset().top;//元素距离文档（document）顶部的高度
            c2 = group2.offset().top;
            if (a + b > c && isFirst) {
                testAnim('.synopsis', 'fadeInUpBig')
                isFirst = false
            }

            if (a + b > c2 && _isFirst) {
                testAnim('.status-list-a', 'bounceInRight')
                _isFirst = false
            }


        });
    });

    $scope.$watch('$routeParams', function (o, n) {
        $scope.getData();
    }, true);
}
]);



