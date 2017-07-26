/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('LoginCtrl', function (api, $rootScope, $scope, $http, $location, $auth, notification) {
    $scope.usuario = {};

    // salva um registro (pode ser inserindo ou editando)
    $scope.setUsuario = function (usuario) {
        var url = api.baseUrl + '/usuarios';

        // adiciona novo usuario
        $http.post(url, usuario).then(
            function (response) {
                $scope.getUsuarios();
            },
            function (response) {
                notification.show(response.status);
            }
        );

        $('#modal-usuario').modal('close');
        $scope.usuario = {};
    };

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

    $scope.doNew = function () {
        $scope.usuario = {};
        $scope.desativaSenha = false;
        $('#modal-usuario').modal('open');
    };

    $scope.doCancel = function () {
        $('#modal-usuario').modal('close');
        $scope.usuario = {};
    };
});
