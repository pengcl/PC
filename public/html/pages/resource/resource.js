"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/resource', { //app首页
            templateUrl: 'pages/resource/resource.html',
            controller: "resourceController"
        });
}]).controller('resourceController', ['$scope', '$location', 'ArticleSvc', function ($scope, $location, ArticleSvc) {
    $scope.apiPrefix = apiPrefix;
    $scope.imgs = [];

    $scope.getData = function () {
        $.each(appMenus, function (index, item) {
            if (item.id === 7) {
                $scope.item = item;
            }
        });
    };

    ArticleSvc.items('?menu.id=7').then(function success(res) {
        var list = [];
        $.each(res, function (index, item) {
            if (!item.keywords) {
                $scope.imgs.push(item)
            } else {
                const i = getIndex(list, 'type', item.keywords)
                if (!i && i !== 0) {
                    list.push({type: item.keywords, content: []})
                }
                $.each(list, function (_index, _item) {
                    if (_item.type === item.keywords) {
                        _item.content.push(item)
                    }

                })
            }
        });
        $scope.articles = list;
    });

    function testAnim(elem, x) {
        $(elem).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated');
        });
    };


    $(document).ready(function () {
        var a, b, c, c2, c3;
        var isFirst = true;
        var _isFirst = true;
        var isFirst2 = true;
        a = $(window).height();    //浏览器窗口高度
        var group = $(".gallery-resource1");
        var group2 = $(".gallery-resource2");
        var group3 = $(".resource-content1");
        $(window).scroll(function () {
            b = $(this).scrollTop();   //页面滚动的高度
            c = group.context.scrollingElement.scrollTop;
            c2 = group2.context.scrollingElement.scrollTop;
            c3 = group3.context.scrollingElement.scrollTop;//元素距离文档（document）顶部的高度
            if (a + b > c && isFirst) {
                testAnim('.gallery-resource1', 'bounceInRight');
                isFirst = false
            }

            if (a + b > c2 && _isFirst) {
                setTimeout(function () {
                    testAnim('.gallery-resource2', 'bounceInLeft');
                }, 1000);

                _isFirst = false
            }

            if (a + b > c3 && isFirst2) {
                setTimeout(function () {
                    testAnim('.resource-content1', 'bounceInRight');
                }, 2000);

                isFirst2 = false
            }


        });
    });

    $scope.$watch('$routeParams', function (o, n) {
        $scope.getData();
    }, true);

}
]);



