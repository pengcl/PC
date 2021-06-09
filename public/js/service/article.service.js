appServices.factory('ArticleSvc', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.items = function (query) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiPrefix + '/articles' + (query ? query : '')).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.item = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiPrefix + '/articles/' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.files = function (query) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiPrefix + '/assets' + (query ? query : '')).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
