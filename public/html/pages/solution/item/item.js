"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/solution/item/:id', { //app首页
            templateUrl: 'pages/solution/item/item.html',
            controller: "solutionItemController"
        });
}]).controller('solutionItemController', ['$scope', '$location', '$routeParams', 'ArticleSvc', function ($scope, $location, $routeParams, ArticleSvc) {
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

    function testAnim(elem, x) {
        $(elem).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated');
        });
    }

    $(document).ready(function () {
        var a, b, c,c2;
        var isFirst = true;
        var _isFirst = true;
        a = $(window).height();    //浏览器窗口高度
        var group = $(".content-s-item");
        var group2 = $(".gallery-img");
        $(window).scroll(function () {
            b = $(this).scrollTop();   //页面滚动的高度
            c = group.context.scrollingElement.scrollTop;//元素距离文档（document）顶部的高度
            c2 = group2.context.scrollingElement.scrollTop;
            if (a + b > c && isFirst) {
                testAnim('.content-s-item', 'fadeInRight')
                isFirst = false
            }

            if (a + b > c2 && _isFirst) {
                testAnim('.gallery-img', 'fadeInLeft')
                _isFirst = false
            }


        });
    });
}
]);



