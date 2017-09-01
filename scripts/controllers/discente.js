/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('DiscenteCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.filtro = {'status': true};
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
                notification.show(response.status, null);
            }
        );
    };
    $scope.getDiscentes();

    $scope.getDiscente = function (id) {
        var url = api.baseUrl + '/discentes/' + id;

        $http.get(url).then(
            function (response) {
                $scope.discente = response.data[0];
                $('#modal-discente').modal('show');
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };

    // salva um registro (pode ser inserindo ou editando)
    $scope.setDiscente = function (discente) {
        var url = api.baseUrl + '/discentes';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!discente.id) {
            $http.post(url, discente).then(
                function (response) {
                    notification.show(response.status, "Discente adicionado!");
                    $scope.getDiscentes();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        } else {
            $http.put(url, discente).then(
                function (response) {
                    notification.show(response.status, "Discente salvo!");
                    $scope.getDiscentes();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }

        $('#modal-discente').modal('hide');
        $scope.discente = {};
    };

    // inativa um registro
    $scope.delDiscente = function (discente) {
        discente.status = false;

        var url = api.baseUrl + '/discentes';

        // atualiza o registro com status = false;
        $http.put(url, discente).then(
            function (response) {
                $scope.getDiscentes();
            },
            function (response) {
                notification.show(response.status, null);
            }
        );

        $('#modal-discente').modal('hide');
        $scope.discente = {};
    };
});
