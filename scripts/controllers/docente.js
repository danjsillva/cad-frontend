/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('DocenteCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.filtro = {'status': true};
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
                notification.show(response.status, null);
            }
        );
    };
    $scope.getDocentes();

    $scope.getDocente = function (id) {
        var url = api.baseUrl + '/docentes/' + id;

        $http.get(url).then(
            function (response) {
                $scope.docente = response.data[0];
                $('#modal-docente').modal('show');
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };

    // salva um registro (pode ser inserindo ou editando)
    $scope.setDocente = function (docente) {
        var url = api.baseUrl + '/docentes';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!docente.id) {
            $http.post(url, docente).then(
                function (response) {
                    notification.show(response.status, "Docente adicionado!");
                    $scope.getDocentes();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        } else {
            $http.put(url, docente).then(
                function (response) {
                    notification.show(response.status, "Docente salvo!");
                    $scope.getDocentes();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }

        $('#modal-docente').modal('hide');
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
                notification.show(response.status, null);
            }
        );

        $('#modal-docente').modal('hide');
        $scope.docente = {};
    };
});
