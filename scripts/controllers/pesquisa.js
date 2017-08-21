/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('PesquisaCtrl', function (api, $scope, $http, notification) {
    $scope.novoProjeto = true;
    $scope.discentes = [];
    $scope.docentes = [];
    $scope.pesquisas = [];
    $scope.pesquisa = {};
    $scope.radioTipoParticipante = 0;
    $scope.radioTipoAtividade = 0;

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

    // lista todos os registros
    $scope.getPesquisas = function () {
        var url = api.baseUrl + '/pesquisas';

        $http.get(url).then(
            function (response) {
                $scope.pesquisas = response.data;
            },
            function (response) {
                notification.show(response.status);
            }
        );
    };
    // $scope.getPesquisas();

    // salva um registro (pode ser inserindo ou editando)
    $scope.setPesquisa = function (pesquisa) {
        if ($scope.pesquisas.indexOf(pesquisa) == -1) {
            $scope.pesquisas.push(pesquisa);
        }
        // var url = api.baseUrl + '/pesquisas';
        //
        // // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        // if (!pesquisa.id) {
        //     $http.post(url, pesquisa).then(
        //         function (response) {
        //             $scope.getPesquisas();
        //         },
        //         function (response) {
        //             notification.show(response.status);
        //         }
        //     );
        // } else {
        //     $http.put(url, pesquisa).then(
        //         function (response) {
        //             $scope.getPesquisas();
        //         },
        //         function (response) {
        //             notification.show(response.status);
        //         }
        //     );
        // }

        $scope.pesquisa = {};
        $scope.novoProjeto = false;
    };

    $scope.doNewProjeto = function () {
        $scope.pesquisa = {};
        $scope.novoProjeto = true;
    };

    $scope.doEditPesquisa = function (pesquisa) {
        $scope.pesquisa = pesquisa;
        $scope.novoProjeto = true;
    };

    $scope.doCancelPesquisa = function () {
        $scope.novoProjeto = false;
    };


    // ------------------------------------------ PARTICIPANTES
    $scope.doNewParticipante = function () {
        $('#modal-participante').modal('open');
    }

    $scope.doAddParticipante = function (participante, tipo) {
        participante['tipo'] = tipo == 0 ? 'Discente' : 'Docente';
        participante['coordenador'] = 0;
        participante['comissao'] = 0;

        if (!$scope.pesquisa.participantes) {
            $scope.pesquisa.participantes = [];
        }

        if ($scope.pesquisa.participantes.indexOf(participante) == -1) {
            $scope.pesquisa.participantes.push(participante);
        }

        $('#modal-participante').modal('close');
    }

    $scope.remParticipante = function (index) {
        if (confirm("Tem certeza?")) {
            $scope.pesquisa.participantes.splice(index, 1);
        }
    }


    // ------------------------------------------ ATIVIDADES
    $scope.doNewAtividade = function () {
        $('#modal-atividade').modal('open');
    }

    $scope.doAddAtividade = function (atividade, tipo) {
        participante['tipo'] = tipo == 0 ? 'Discente' : 'Docente';
        participante['coordenador'] = 0;
        participante['comissao'] = 0;

        if (!$scope.pesquisa.participantes) {
            $scope.pesquisa.participantes = [];
        }

        if ($scope.pesquisa.participantes.indexOf(atividade) == -1) {
            $scope.pesquisa.participantes.push(atividade);
        }

        $('#modal-atividade').modal('close');
    }

    $scope.remAtividade = function (index) {
        if (confirm("Tem certeza?")) {
            $scope.pesquisa.participantes.splice(index, 1);
        }
    }
});