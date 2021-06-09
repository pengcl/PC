"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/case/item/:type', { //app首页
            templateUrl: 'pages/case/item/item.html',
            controller: "caseItemController"
        });
}]).controller('caseItemController', ['$scope', '$location', '$routeParams', 'ArticleSvc', function ($scope, $location, $routeParams, ArticleSvc) {
    $scope.currentType = $routeParams.type;
    $scope.apiPrefix = apiPrefix;

    $scope.getItem = function () {
        $.each(appMenus, function (index, item) {
            if (item.id === 5) {
                $scope.item = item;
            }
        });
    };

    function testAnim(elem, x) {
        $(elem).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated');
        });
    };


    $(document).ready(function () {
        var a, b, c, c2;
        var isFirst = true;
        var _isFirst = true;
        a = $(window).height();    //浏览器窗口高度
        var group = $(".case-header");
        var group2 = $(".case-list");
        $(window).scroll(function () {
            b = $(this).scrollTop();   //页面滚动的高度
            c = group.context.scrollingElement.scrollTop;
            c2 = group2.context.scrollingElement.scrollTop; //元素距离文档（document）顶部的高度
            if (a + b > c && isFirst) {
                testAnim('.case-header', 'bounceInRight');
                isFirst = false
            }

            if (a + b > c2 && _isFirst) {
                setTimeout(function () {
                    testAnim('.case-list', 'bounceInRight');
                }, 1000);

                _isFirst = false
            }


        });
    });

    $scope.renderFinish = function () {
        $(document).ready(function () {
            var a, b, c;
            a = $(window).height();    //浏览器窗口高度
            var group = $(".case-list");
            $(window).scroll(function () {
                b = $(this).scrollTop();   //页面滚动的高度
                c = group.context.scrollingElement.scrollTop;    //元素距离文档（document）顶部的高度
                if (a + b > c) {
                    testAnim('.case-list', 'bounceInRight')
                }


            });
        });
    };

    $scope.getData = function (keywords) {
        ArticleSvc.items('?menu.id=5' + (keywords === '全部' ? '' : '&keywords_contains=' + keywords)).then(function success(res) {
            $scope.articles = res
        })
    };


    $scope.$watch('currentType', function (o, n) {
        $scope.getData($scope.currentType);
    }, true);

    $scope.$watch('$routeParams', function (o, n) {
        $scope.getItem();
    }, true);
}
])
;



