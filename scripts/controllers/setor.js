/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('SetorCtrl', function (api, $scope, $http, toaster, notification) {
    $scope.filtro = {'status': true};
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
                notification.show(response.status, null);
            }
        );
    };
    $scope.getSetores();

    $scope.getSetor = function (id) {
        var url = api.baseUrl + '/setores/' + id;

        $http.get(url).then(
            function (response) {
                $scope.setor = response.data[0];
                $('#modal-setor').modal('show');
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };

    // salva um registro (pode ser inserindo ou editando)
    $scope.setSetor = function (setor) {
        var url = api.baseUrl + '/setores';

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!setor.id) {
            $http.post(url, setor).then(
                function (response) {
                    notification.show(response.status, "Setor adicionado!");
                    $scope.getSetores();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        } else {
            $http.put(url, setor).then(
                function (response) {
                    notification.show(response.status, "Setor salvo!");
                    $scope.getSetores();
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }

        $('#modal-setor').modal('hide');
        $scope.setor = {};
    };

    // inativa um registro
    $scope.delSetor = function (setor) {
        setor.status = false;

        var url = api.baseUrl + '/setores';

        // atualiza o registro com status = false;
        $http.put(url, setor).then(
            function (response) {
                $scope.getSetores();
            },
            function (response) {
                notification.show(response.status, null);
            }
        );

        $('#modal-setor').modal('hide');
        $scope.setor = {};
    };
});
