/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('LoginCtrl', function ($rootScope, $scope, $location, $auth) {
    $scope.doLogin = function (user) {
        params = "grant_type=password&username=" + user.username + "&password=" + user.password

        $auth.login(params).then(
            function (response) {
                $auth.setToken(response.data.access_token);

                $location.path('/');
            },
            function (response) {
                console.log(response);
            }
        );
    };
});
