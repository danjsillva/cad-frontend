/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('LoginCtrl', function ($rootScope, $scope, $location, $auth) {
    $scope.doLogin = function (user) {
        $scope.loginStatus = undefined;

        params = "grant_type=password&username=" + user.username + "&password=" + user.password

        $auth.login(params).then(
            function (response) {
                $auth.setToken(response.data.access_token);

                $location.path('/');
            },
            function (error) {
                $scope.loginStatus = error.data.error_description;
                $scope.user.password = undefined;
            }
        );
    };
});
