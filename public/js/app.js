var app = angular.module('app', ['ngRoute', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters', 'appDirectives']);
var appConfig;
var appMenus;
var appAddress;
var appLanguage;
var isReady = false;
var lan;
var cookie = {
    set: function (key, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    get: function (key) {
        var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    remove: function (key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(key);
        if (cval != null) {
            document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
};
app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: (function () {
                return 'index';
            })()
        });
        $locationProvider.html5Mode(true);
    }]).config(['$sceProvider', function ($sceProvider) {
    //For sport ie7
    $sceProvider.enabled(false);
}]).controller('appController', [function () {

}]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$locationChangeStart', function () {//初始化全局控件的状态
        toTop();
    });
}]);



angular.element(document).ready(function () {
    $.ajax({
        url: apiPrefix + '/addresses', success: function (res) {
            appAddress = res;
        }
    });
    $.ajax({
        url: apiPrefix + '/languages', success: function (res) {
            appLanguage = res;
        }
    });
    $.ajax({
        url: apiPrefix + '/config', success: function (res) {
            appConfig = res;
            lan = cookie.get('lan');
            if (!lan) {
                lan = appConfig.language.code
            }
            bootstrap()
        }
    });
    $.ajax({
        url: apiPrefix + '/menus', success: function (res) {
            appMenus = res;
            bootstrap()
        }
    });

});

function bootstrap() {
    if (isReady) {
        angular.bootstrap(document, ['app']);
    } else {
        isReady = true
    }
}
