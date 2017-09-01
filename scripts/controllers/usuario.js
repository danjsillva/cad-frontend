/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('UsuarioCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.filtro = {'isAtivo': true};
    $scope.usuarios = [];
    $scope.usuario = {};

    // lista todos os registros
    $scope.getUsuarios = function () {
        var url = api.baseUrl + '/usuarios';

        $http.get(url).then(
            function (response) {
                $scope.usuarios = response.data;
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };
    $scope.getUsuarios();

    $scope.getUsuario = function (id) {
        var url = api.baseUrl + '/usuarios/' + id;

        $http.get(url).then(
            function (response) {
                $scope.usuario = response.data[0];
                $('#modal-usuario').modal('show');
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };

    // salva um registro (pode ser inserindo ou editando)
    $scope.setUsuario = function (usuario) {
        var url = api.baseUrl + '/usuarios';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!usuario.id) {
            $http.post(url, usuario).then(
                function (response) {
                    notification.show(response.status, "Usuario adicionado!");
                    $scope.getUsuarios();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        } else {
            $http.put(url, usuario).then(
                function (response) {
                    notification.show(response.status, "Usuario salvo!");
                    $scope.getUsuarios();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }

        $('#modal-usuario').modal('hide');
        $scope.usuario = {};
    };

    // inativa um registro
    $scope.delUsuario = function (usuario) {
        usuario.isAtivo = false;

        var url = api.baseUrl + '/usuarios';

        // atualiza o registro com isAtivo = false;
        $http.put(url, usuario).then(
            function (response) {
                $scope.getUsuarios();
            },
            function (response) {
                notification.show(response.status, null);
            }
        );

        $('#modal-usuario').modal('hide');
        $scope.usuario = {};
    };
});
