/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('UsuarioCtrl', function (api, $scope, $http, notification) {
    $scope.usuarios = [];
    $scope.usuario = {};
    $scope.filtro = {isAtivo: true};

    // lista todos os registros
    $scope.getUsuarios = function () {
        var url = api.baseUrl + '/usuarios';

        $http.get(url).then(
            function (response) {
                $scope.usuarios = response.data;
            },
            function (response) {
                notification.show(response.status);
            }
        );
    };
    $scope.getUsuarios();

    // salva um registro (pode ser inserindo ou editando)
    $scope.setUsuario = function (usuario) {
        var url = api.baseUrl + '/usuarios';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!usuario.id) {
            $http.post(url, usuario).then(
                function (response) {
                    $scope.getUsuarios();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        } else {
            delete(usuario.senha);
            console.log(usuario);
            $http.put(url, usuario).then(
                function (response) {
                    $scope.getUsuarios();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        }

        $('#modal-usuario').modal('close');
        $scope.usuario = {};
    };

    // inativa um registro
    $scope.delUsuario = function (usuario) {
        usuario.IsAtivo = false;

        var url = api.baseUrl + '/usuarios';

        // atualiza o registro com IsAtivo = false;
        $http.put(url, usuario).then(
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

    $scope.doNew = function () {
        $scope.usuario = {};
        $scope.desativaSenha = false;
        $('#modal-usuario').modal('open');
    };

    $scope.doEdit = function (usuario) {
        $scope.usuario = usuario;
        $scope.desativaSenha = true;
        $('#modal-usuario').modal('open');
    };

    $scope.doCancel = function () {
        $('#modal-usuario').modal('close');
        $scope.usuario = {};
    };

    $scope.checkAtivos = function () {
        $scope.filtro.isAtivo ? $scope.filtro.isAtivo = true : $scope.filtro.isAtivo = undefined;
    };
});
