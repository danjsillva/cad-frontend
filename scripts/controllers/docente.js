/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('DocenteCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.docentes = [];
    $scope.docente = {};

    // lista todos os registros
    $scope.getDocentes = function () {
        var url = api.baseUrl + '/docentes';

        $http.get(url).then(
            function (response) {
                $scope.docentes = response.data;
            },
            function (response) {
                notification.show(response.status);
            }
        );
    };
    $scope.getDocentes();

    // salva um registro (pode ser inserindo ou editando)
    $scope.setDocente = function (docente) {
        var url = api.baseUrl + '/docentes';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!docente.id) {
            $http.post(url, docente).then(
                function (response) {
                    $scope.getDocentes();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        } else {
            $http.put(url, docente).then(
                function (response) {
                    $scope.getDocentes();
                },
                function (response) {
                    notification.show(response.status);
                }
            );
        }

        $('#modal-docente').modal('close');
        $scope.docente = {};
    };

    // inativa um registro
    $scope.delDocente = function (docente) {
        docente.status = false;

        var url = api.baseUrl + '/docentes';

        // atualiza o registro com status = false;
        $http.put(url, docente).then(
            function (response) {
                $scope.getDocentes();
            },
            function (response) {
                toaster.pop('error', "Usuário [Erro: " + response.status + "]", "Não foi possível obter uma resposta válida do servidor.");
            }
        );

        $('#modal-docente').modal('close');
        $scope.docente = {};
    };

    $scope.doNew = function () {
        $scope.docente = {};
        $('#modal-docente').modal('open');
    };

    $scope.doEdit = function (docente) {
        $scope.docente = docente;
        $('#modal-docente').modal('open');
    };

    $scope.doCancel = function () {
        $('#modal-docente').modal('close');
        $scope.docente = {};
    };
});
