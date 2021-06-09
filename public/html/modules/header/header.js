'use strict';

app.directive('ngHeader', ['$location', '$rootScope', function ($location, $rootScope) {
    return {
        restrict: 'C',
        scope: {},
        templateUrl: 'modules/header/header.html',
        link: function (scope, element, attrs) {
            scope.apiPrefix = apiPrefix
            scope.appConfig = appConfig
            scope.appLanguage = appLanguage
            scope.lan = lan
            scope.left = 0
            var list = [];
            var _list = [];
            $.each(appMenus, function (index, item) {
                if (!item.menu) {
                    list.push(item);
                }
                $.each(list, function (_index, _item) {
                    if (_item.menus.length > 0) {
                        $.each(_item.menus, function (i, item2) {
                            if (item.menu && item2.id === item.menu.id) {
                                _list.push(item)
                            }
                            item2.menus = _list
                        });

                    }

                })
            });
            $.each(list, function (index, item) {
                if (item.menus.length > 0) {
                    $.each(item.menus, function (_index, _item) {
                        if (_item.menus.length > 0) {
                            var _list = [];
                            $.each(_item.menus, function (index2, item2) {
                                if (item2.menu && (item2.menu.id === _item.id)) {
                                    _list.push(item2)
                                }
                            });
                            _item.menus = _list
                        }
                    })
                }
            });
            scope.menus = list;
            scope.show = false;
            scope.showSubmenus = function (id, index) {
                scope.currentId = id
                scope.currentMenu = getCurrentMenu(id);
                scope.submenus = getCurrentMenus(id);
                scope.show = true;
                scope.showlan = false;

            };
            scope.leaveMenu = function () {
                scope.currentId = 0
            };
            scope.showLan = function () {
                scope.show = false;
                scope.showlan = true
            };
            scope.showSubmenu = function (item) {
                if (item.menus && item.menus.length > 0) {
                    scope.currentSubmenuId = item.id
                    scope._show = true;
                    scope.currentSubmenus = item.menus;
                    setTimeout(function () {
                        $('.submenus-list').addClass('show ' + 'bounceInLeft' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('animated');
                        });
                    }, 200)

                }
            };
            scope.hideLan = function () {
                scope.showlan = false
            };
            scope.hideSubmenus = function () {
                scope.show = false;
                scope._show = false
            };
            scope.setLan = function (code) {
                lan = code
                cookie.set('lan', code)
                window.location.reload();
            };
            scope.link = function (menu) {
                scope.showMobile = false
                if ((!menu.menu && menu.menus.length < 1) || menu.id === 3) {
                    $location.path(menu.path)
                } else {
                    if (!menu.menu) {
                        $location.path(menu.path + '/' + menu.menus[0].id)
                    } else {
                        $location.path(menu.path + '/' + menu.id)
                    }
                }

            };
            scope.showMobile = false;
            scope.showMobileMenu = function () {
                scope.showMobile = !scope.showMobile;
            };
            scope.show_mobile = {};
            scope.showMobileSub = function (index) {
                scope.show_mobile['show' + index] = !scope.show_mobile['show' + index]
            };
            scope.showMobileLan = false;
            scope.showMobileLanuage = function () {
                scope.showMobileLan = !scope.showMobileLan;
            };
            $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态
                scope.path = $location.path();
            });


        }
    };
}])
;
