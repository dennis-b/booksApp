var app = angular.module('myApp', ['ui.bootstrap']);

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

app.controller('PageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
    $scope.items = [];

    // create empty search model (object) to trigger $watch on update
    $scope.search = {};

    $scope.resetFilters = function () {
        // needs to be a function or it won't trigger a $watch
        $scope.search = {};
    };

    // pagination controls
    $scope.currentPage = 1;
    $scope.totalItems = $scope.items.length;
    $scope.entryLimit = 8; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    // $watch search to update pagination
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.items, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);
}]);