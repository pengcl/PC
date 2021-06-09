"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/media', { //app首页
            templateUrl: 'pages/media/media.html',
            controller: "mediaController"
        });
}]).controller('mediaController', ['$scope', '$location', '$routeParams', 'ArticleSvc', function ($scope, $location, $routeParams, ArticleSvc) {
    $scope.currentType = $routeParams.type ? $routeParams.type : '全部';
    $scope.apiPrefix = apiPrefix;

    $scope.getItem = function () {
        $.each(appMenus, function (index, item) {
            if (item.id === 6) {
                $scope.item = item;
            }
        });
    };

    $scope.select = function (value) {
        $scope.currentType = value
    };

    function testAnim(elem, x) {
        $(elem).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated');
        });
    };

    $scope.renderFinish = function () {
        $(document).ready(function () {
            var a, b, c;
            var isFirst = true;
            a = $(window).height();    //浏览器窗口高度
            var group = $(".gallery-media")
            $(window).scroll(function () {
                b = $(this).scrollTop();   //页面滚动的高度
                c = group.context.scrollingElement.scrollTop;    //元素距离文档（document）顶部的高度
                if (a + b > c && isFirst) {
                    testAnim('.gallery-media', 'fadeInUp')
                    isFirst = false
                }
            });


        });
    };




    $scope.getData = function (keywords) {
        ArticleSvc.items('?menu.id=6' + (keywords === '全部' ? '' : '&keywords_contains=' + keywords)).then(function success(res) {
            $scope.articles = res
        })
    };

    ArticleSvc.items('?menu.id=6').then(function success(res) {
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

    $scope.$watch('$location', function (o, n) {
        $location.$$search = {}
    }, true);
}
]);



