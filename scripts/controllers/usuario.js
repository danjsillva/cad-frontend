/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('UsuarioCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.users = [];
    $scope.user = {};

    $scope.getUsuarios = function () {
        var url = api.baseUrl + '/usuarios';

        $http.get(url).then(
            function (response) {
                $scope.users = response.data;
            },
            function (response) {
                notification.show(response.status);
            }
        );
    };
    $scope.getUsuarios();

    $scope.setUsuario = function (user) {
        var url = api.baseUrl + '/usuarios';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!user.Id) {
            $http.post(url, user).then(
                function (response) {
                    $scope.getUsuarios();
                    notification.show(response.status);
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        } else {
            $http.put(url, user).then(
                function (response) {
                    $scope.getUsuarios();
                    notification.show(response.status);
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        }

        $('#modal-usuario').modal('close');
        $scope.user = {};
    };

    $scope.delUsuario = function (user) {
        user.IsAtivo = false;

        var url = api.baseUrl + '/usuarios';

        // atualiza o registro com IsAtivo = false;
        $http.put(url, user).then(
            function (response) {
                $scope.getUsuarios();
            },
            function (response) {
                toaster.pop('error', "Usuário [Erro: " + response.status + "]", "Não foi possível obter uma resposta válida do servidor.");
            }
        );

        $('#modal-usuario').modal('close');
        $scope.user = {};
    };

    $scope.doNew = function () {
        $scope.user = {};
        $('#modal-usuario').modal('open');
    };

    $scope.doEdit = function (user) {
        $scope.user = user;
        $('#modal-usuario').modal('open');
    };

    $scope.doCancel = function () {
        $('#modal-usuario').modal('close');
        $scope.user = {};
    };
});
