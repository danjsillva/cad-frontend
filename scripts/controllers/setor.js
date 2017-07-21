/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('SetorCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.setores = [];
    $scope.setor = {};

    // lista todos os registros
    $scope.getSetores = function () {
        var url = api.baseUrl + '/setores';

        $http.get(url).then(
            function (response) {
                $scope.setores = response.data;
            },
            function (response) {
                notification.show(response.status);
            }
        );
    };
    $scope.getSetores();

    // salva um registro (pode ser inserindo ou editando)
    $scope.setSetor = function (setor) {
        var url = api.baseUrl + '/setores';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!setor.id) {
            $http.post(url, setor).then(
                function (response) {
                    $scope.getSetores();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        } else {
            $http.put(url, setor).then(
                function (response) {
                    $scope.getSetores();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        }

        $('#modal-setor').modal('close');
        $scope.setor = {};
    };

    // inativa um registro
    $scope.delSetor = function (setor) {
        setor.IsAtivo = false;

        var url = api.baseUrl + '/setores';

        // atualiza o registro com IsAtivo = false;
        $http.put(url, setor).then(
            function (response) {
                $scope.getSetores();
            },
            function (response) {
                toaster.pop('error', "Usuário [Erro: " + response.status + "]", "Não foi possível obter uma resposta válida do servidor.");
            }
        );

        $('#modal-setor').modal('close');
        $scope.setor = {};
    };

    $scope.doNew = function () {
        $scope.setor = {};
        $('#modal-setor').modal('open');
    };

    $scope.doEdit = function (setor) {
        $scope.setor = setor;
        $('#modal-setor').modal('open');
    };

    $scope.doCancel = function () {
        $('#modal-setor').modal('close');
        $scope.setor = {};
    };
});
