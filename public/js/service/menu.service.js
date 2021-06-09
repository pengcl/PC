appServices.factory('MenuSvc', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.get = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiPrefix + '/menus').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.item = function (id) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiPrefix + '/menus/' + id).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };


    return service;
}]);
