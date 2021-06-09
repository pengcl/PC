"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/case/list', { //app首页
            templateUrl: 'pages/case/list/list.html',
            controller: "caseListController"
        });
}]).controller('caseListController', ['$scope', '$location', 'ArticleSvc', function ($scope, $location, ArticleSvc) {
    $scope.currentType = '全部';
    $scope.apiPrefix = apiPrefix;

    $scope.getItem = function () {
        $.each(appMenus, function (index, item) {
            if (item.id === 5) {
                $scope.item = item;
            }
        });
    };

    function testAnim(x, index) {
        $('.gallery-item.item' + index).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated');
        });
    };

    $scope.select = function (value) {
        $scope.currentType = value;
        $location.url('/case/item/' + value)
    };

    $scope.renderFinish = function () {
        $(document).ready(function () {
            var a, b, c;
            a = $(window).height();    //浏览器窗口高度
            var group = $(".gallery-item");
            $.each(group, function (index, item) {
                if (index < 2) {
                    $(window).scroll(function () {
                        b = $(this).scrollTop();   //页面滚动的高度
                        c = item.offsetTop;    //元素距离文档（document）顶部的高度
                        if (a + b > c) {
                            testAnim('bounceInLeft', index)
                        }
                    });
                }

            })
        });
    };

    $scope.getData = function (keywords) {
        ArticleSvc.items('?menu.id=5' + (keywords === '全部' ? '' : '&keywords_contains=' + keywords)).then(function success(res) {
            $scope.articles = res
        })
    };

    ArticleSvc.items('?menu.id=5').then(function success(res) {
        var list = [];
        $.each(res, function (index, item) {
            if (item.keywords) {
                const items = item.keywords.split('，');
                $.each(items, function (i, _item) {
                    const _i = getIndex(list, 'type', _item)
                    if (!_i && _i !== 0) {
                        list.push({type: _item})
                    }
                });
            }
        });
        $scope.types = list;
        $scope.types.unshift({type: '全部'})
    });

    $scope.$watch('currentType', function (o, n) {
        $scope.getData($scope.currentType);
    }, true);

    $scope.$watch('$routeParams', function (o, n) {
        $scope.getItem();
    }, true);
}
]);



