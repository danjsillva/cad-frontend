/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('DiscenteCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.discentes = [];
    $scope.discente = {};

    // lista todos os registros
    $scope.getDiscentes = function () {
        var url = api.baseUrl + '/discentes';

        $http.get(url).then(
            function (response) {
                $scope.discentes = response.data;
            },
            function (response) {
                notification.show(response.status);
            }
        );
    };
    $scope.getDiscentes();

    // salva um registro (pode ser inserindo ou editando)
    $scope.setDiscente = function (discente) {
        var url = api.baseUrl + '/discentes';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!discente.id) {
            $http.post(url, discente).then(
                function (response) {
                    $scope.getDiscentes();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        } else {
            $http.put(url, discente).then(
                function (response) {
                    $scope.getDiscentes();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        }

        $('#modal-discente').modal('close');
        $scope.discente = {};
    };

    // inativa um registro
    $scope.delDiscente = function (discente) {
        discente.IsAtivo = false;

        var url = api.baseUrl + '/discentes';

        // atualiza o registro com IsAtivo = false;
        $http.put(url, discente).then(
            function (response) {
                $scope.getDiscentes();
            },
            function (response) {
                toaster.pop('error', "Usuário [Erro: " + response.status + "]", "Não foi possível obter uma resposta válida do servidor.");
            }
        );

        $('#modal-discente').modal('close');
        $scope.discente = {};
    };

    $scope.doNew = function () {
        $scope.discente = {};
        $('#modal-discente').modal('open');
    };

    $scope.doEdit = function (discente) {
        $scope.discente = discente;
        $('#modal-discente').modal('open');
    };

    $scope.doCancel = function () {
        $('#modal-discente').modal('close');
        $scope.discente = {};
    };
});
