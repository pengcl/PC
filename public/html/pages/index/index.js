"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/index', { //app首页
            templateUrl: 'pages/index/index.html',
            controller: "indexController"
        });
}]).controller('indexController', ['$scope', '$routeParams', '$location', 'MenuSvc', 'ArticleSvc', function ($scope, $routeParams, $location, MenuSvc, ArticleSvc) {
    $scope.apiPrefix = apiPrefix;
    $scope.currentId = 1;
    $scope.width = $(window).width();


    $scope.solutionsRepeat=function(){
        $('.owl-carousel').owlCarousel({
            loop:false,
            margin:10,
            nav:true,
            responsive:{
                0:{
                    items:3
                },
                1000:{
                    items:7
                }
            }
        })
    };


    $scope.renderFinish = function () {
        swiper();
    };

    ArticleSvc.items('?menu.id=4').then(function success(res) {
        var list = [];
        $.each(res, function (index, item) {
            if (item.content_type) {
                list.push(item)
            }
        });
        $scope.solutions = list;
        $scope.startIndex = 0;
        $scope.endIndex = 3;
        $scope.filterSolutions = $scope.solutions.slice($scope.startIndex, $scope.endIndex);
        $scope.currentId = $scope.solutions[0].content_type.id;
        $scope.solution = $scope.solutions[0]
    });

    $scope.prev = function () {
        if ($scope.startIndex === 0) {
            return false;
        }
        $scope.startIndex -= 1;
        $scope.endIndex -= 1;
        $scope.filterSolutions = $scope.solutions.slice($scope.startIndex, $scope.endIndex);
    };

    $scope.next = function () {
        if ($scope.endIndex === $scope.solutions.length) {
            return false;
        }
        $scope.startIndex += 1;
        $scope.endIndex += 1;
        $scope.filterSolutions = $scope.solutions.slice($scope.startIndex, $scope.endIndex);
    };

    $scope.prevCase = function () {
        if ($scope.currentCaseIndex === 0) {
            return false;
        }
        $scope.currentCaseIndex -= 1;
        $scope.currentCase = $scope.caseList[$scope.currentCaseIndex];
    };

    $scope.nextCase = function () {
        if ($scope.currentCaseIndex === $scope.caseList.length - 1) {
            return false;
        }
        $scope.currentCaseIndex += 1;
        $scope.currentCase = $scope.caseList[$scope.currentCaseIndex];
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
        $scope.articles = res;
        $scope.articles = $scope.articles.slice(0, 4);
        $scope.currentArticle = $scope.articles[0].id;
        $scope.currentImg = $scope.articles[0].thumb.url;
    });

    $scope.select = function (value) {
        $scope.currentId = value;
        $.each($scope.solutions, function (index, item) {
            if ($scope.currentId === item.content_type.id) {
                $scope.solution = item
            }
        });
    };

    $scope.articleOver = function (item) {
        $scope.currentArticle = item.id;
        $scope.currentImg = item.thumb.url;
    };

    function testAnim(x) {
        $('.index-middle-content').addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated');
        });
    }

    $(document).ready(function () {
        var a, b, c;
        var isFirst = true
        a = $(window).height();    //浏览器窗口高度
        var group = $(".status-list");
        $(window).scroll(function () {
            b = $(this).scrollTop();   //页面滚动的高度
            c = group.offset().top;//元素距离文档（document）顶部的高度

            if (a + b > c && isFirst) {
                adds()
                isFirst = false
            }


        });
    });

    $scope.getData = function () {
        $.each(appMenus, function (index, item) {
            if (item.id === 1) {
                $scope.item = item;
                testAnim('bounceInUp');
                var list = [];
                $.each($scope.item.poster, function (_index, _item) {
                    if (_item.url) {
                        list.push(_item)
                    }
                });
                $scope.imageList = list;
            } else if (item.id === 5) {
                ArticleSvc.items('?menu.id=5').then(function success(res) {
                    $scope.caseList = res;
                    $scope.currentCaseIndex = 0;
                    $scope.currentCase = $scope.caseList[$scope.currentCaseIndex];
                });
            }
        });
    };

    $scope.showMap = function (type) {
        $scope['show_' + type] = true;
    };

    $scope.hideMap = function (type) {
        $scope['show_' + type] = false;
    };

    $scope.$watch('$routeParams', function (o, n) {
        $scope.getData();

    }, true);
}
]);



