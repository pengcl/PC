"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/product/list', { //app首页
            templateUrl: 'pages/product/list/list.html',
            controller: "productListController"
        });
}]).controller('productListController', ['$scope', '$routeParams', '$location', 'ArticleSvc', function ($scope, $routeParams, $location, ArticleSvc) {
    $scope.apiPrefix = apiPrefix;
    $scope.show = {};
    $scope.width = $(window).width();

    $scope.getData = function () {
        $.each(appMenus, function (index, item) {
            if (item.id === 3) {
                $scope.item = item;
            }
        });
    };

    var list = [];
    ArticleSvc.items().then(function success(res) {
        $.each(res, function (index, item) {
            if (item.menu.menu) {
                if (item.menu.menu === 3) {
                    list.push(item)
                }
                $.each(appMenus, function (i, menu) {
                    if (menu.menu && menu.id === item.menu.menu) {
                        list.push(item)
                    }
                })
            }
        });
        $scope.articles = list;
    });

    $scope.articleMouseOver = function (index) {
        $scope.show['show' + index] = true
    };

    $scope.articleMouseLeave = function (index) {
        $scope.show['show' + index] = false
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
        var a, b, c;
        var isFirst = true;
        a = $(window).height();    //浏览器窗口高度
        var group = $(".content-p");
        $(window).scroll(function () {
            b = $(this).scrollTop();   //页面滚动的高度
            c = group.context.scrollingElement.scrollTop;//元素距离文档（document）顶部的高度
            if (a + b > c && isFirst) {
                testAnim('.content-p', 'fadeInUpBig')
                isFirst = false
            }


        });
    });
}
]);



