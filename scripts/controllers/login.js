/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('LoginCtrl', function ($rootScope, $scope, $location) {
    $scope.doLogin = function (user) {
        $rootScope.session.user = user;
        $rootScope.session.logged = true;

        $location.path('/');
    };
});
