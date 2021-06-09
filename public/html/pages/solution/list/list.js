"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/solution/list', { //app首页
            templateUrl: 'pages/solution/list/list.html',
            controller: "solutionListController"
        });
}]).controller('solutionListController', ['$scope', '$location', 'ArticleSvc', function ($scope, $location, ArticleSvc) {
    $scope.apiPrefix = apiPrefix;
    $scope.width = $(window).width();

    $scope.getData = function () {
        $.each(appMenus, function (index, item) {
            if (item.id === 4) {
                $scope.item = item;
            }
        });
    };

    ArticleSvc.items('?menu.id=4').then(function success(res) {
        $scope.articles = res;
    });

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
        var group = $(".content-s");
        $(window).scroll(function () {
            b = $(this).scrollTop();   //页面滚动的高度
            c = group.context.scrollingElement.scrollTop;//元素距离文档（document）顶部的高度
            if (a + b > c && isFirst) {
                testAnim('.content-s', 'fadeInUpBig')
                isFirst = false
            }



        });
    });
}
]);



