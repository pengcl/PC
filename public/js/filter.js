'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('lan', ['$rootScope', function ($rootScope) {//订单状态
    return function (o, key) {
        return o[key + '_' + appConfig.language.code];
    };
}]);

appFilters.filter('html', ['$rootScope', function ($rootScope) {//订单状态
    return function (content) {
        return content ? marked(content) : content;
    };
}]);
