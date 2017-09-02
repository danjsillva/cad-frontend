/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('ProjetoCtrl', function (api, $scope, $http, $location, toaster, notification) {
    $scope.params = $location.search();;

    $scope.filtro = {'status': undefined, 'tipo': $scope.params.tipo};
    $scope.detalhesprojeto = false;
    $scope.projetos = [];
    $scope.projeto = {};
    $scope.participantesprojeto = [];
    $scope.atividades = [];
    $scope.atividade = {};
    $scope.participantesatividade = [];
    $scope.tarefas = [];
    $scope.tarefa = {};
    $scope.participantestarefa = [];
    $scope.anexos = {};

    $scope.tipoprojeto = $scope.params.tipo == 0 ? 'Pesquisa' : 'Extensão';
    $scope.tipoparticipante = 1;

    // lista todos os registros
    $scope.getProjetos = function () {
        var url = api.baseUrl + '/projetos';

        $http.get(url).then(
            function (response) {
                $scope.projetos = response.data;
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };
    $scope.getProjetos();

    $scope.getProjeto = function (id) {
        var url = api.baseUrl + '/projetos/' + id;

        $http.get(url).then(
            function (response) {
                $scope.projeto = response.data.projeto;
                $scope.participantesprojeto = response.data.participantesProjeto;
                $scope.atividades = response.data.atividades;
                $scope.participantesatividade = response.data.participantesAtividade;
                $scope.tarefas = response.data.tarefas;
                $scope.participantestarefa = response.data.participantesTarefa;
                $scope.anexos = response.data.anexosProjeto;

                $scope.detalhesprojeto = true;
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };

    // salva um registro (pode ser inserindo ou editando)
    $scope.setProjeto = function (projeto) {
        var url = api.baseUrl + '/projetos';

        projeto.tipo = $scope.params.tipo;

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!projeto.id) {
            $http.post(url, {'projeto': projeto}).then(
                function (response) {
                    notification.show(response.status, "Projeto adicionado!");
                    $scope.getProjetos();
                },
                function (response) {
                    notification.show(response.status, null);
                    $scope.detalhesprojeto = false;
                }
            );
        } else {
            $http.put(url, projeto).then(
                function (response) {
                    notification.show(response.status, "Alterações salvas!");
                    $scope.getProjetos();
                },
                function (response) {
                    notification.show(response.status, null);
                    $scope.detalhesprojeto = false;
                }
            );
        }

        $('#modal-projeto').modal('hide');
    };

    // -------------------------------------------------- participantes
    $scope.setParticipante = function (participante, tipo, idprojeto, idatividade, idtarefa) {
        // define a rota onde adicionar o participante...
        if (idprojeto) {
            var url = api.baseUrl + '/participantesprojeto';
        }
        if (idatividade) {
            var url = api.baseUrl + '/participantesatividade';
        }
        if (idtarefa) {
            var url = api.baseUrl + '/participantestarefas';
        }

        // se tipo != null entao ta adicionando participante ao projeto (coloca no formato do backend)
        if (tipo != null) {
            let temp = {
                'projetoId': idprojeto,
                'discenteId': !tipo ? participante.id : null ,
                'docenteId': tipo ? participante.id : null ,
                'tipoParticipante': tipo,
                'coordenador': null,
                'comissao': null,
            };

            participante = temp;

            // fecha o modal de participante
            $('#modal-projeto').modal('hide');
        }

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!participante.id) {
            $http.post(url, participante).then(
                function (response) {
                    notification.show(response.status, "Participante adicionado!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        } else {
            $http.put(url, participante).then(
                function (response) {
                    notification.show(response.status, "Alterações salvas!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }
    };

    $scope.delParticipante = function (id, idprojeto) {
        if (confirm('Tem certeza?')) {
            var url = api.baseUrl + '/participantesprojeto/' + id;

            $http.delete(url).then(
                function (response) {
                    notification.show(response.status, "Participante removido!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }
    };

    // -------------------------------------------------- atividades
    $scope.setAtividade = function (atividade, idprojeto) {
        var url = api.baseUrl + '/atividades'

        atividade.projetoId = idprojeto;

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!atividade.id) {
            $http.post(url, {'atividadeProjeto': atividade}).then(
                function (response) {
                    notification.show(response.status, "Atividade adicionada!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        } else {
            $http.put(url, {'atividadeProjeto': atividade}).then(
                function (response) {
                    notification.show(response.status, "Alterações salvas!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }

        $('#modal-atividade').modal('hide');
    };

    $scope.getAtividade = function (id) {
        var url = api.baseUrl + '/atividades/' + id;

        $http.get(url).then(
            function (response) {
                $scope.atividade = response.data.atividadeProjeto;
                $scope.participantesatividade = response.data.participantesAtividade;
                $('#modal-atividade').modal('show');
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };

    $scope.delAtividade = function (id, idprojeto) {
        if (confirm('Tem certeza?')) {
            var url = api.baseUrl + '/atividades/' + id;

            $http.delete(url).then(
                function (response) {
                    notification.show(response.status, "Atividade removida!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }
    };

    // -------------------------------------------------- tarefas
    $scope.setTarefa = function (tarefa, idprojeto) {
        var url = api.baseUrl + '/tarefas'

        tarefa.projetoId = idprojeto;

        // se nao tem id adiciona novo registro (se nao... atualiza o registro existente)
        if (!tarefa.id) {
            $http.post(url, {'tarefaProjeto': tarefa}).then(
                function (response) {
                    notification.show(response.status, "Tarefa adicionada!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        } else {
            $http.put(url, {'tarefaProjeto': tarefa}).then(
                function (response) {
                    notification.show(response.status, "Alterações salvas!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }

        $('#modal-tarefa').modal('hide');
    };

    $scope.getTarefa = function (id) {
        var url = api.baseUrl + '/tarefas/' + id;

        $http.get(url).then(
            function (response) {
                $scope.tarefa = response.data.tarefaProjeto;
                $('#modal-tarefa').modal('show');
            },
            function (response) {
                notification.show(response.status, null);
            }
        );
    };

    $scope.delTarefa = function (id, idprojeto) {
        if (confirm('Tem certeza?')) {
            var url = api.baseUrl + '/tarefas/' + id;

            $http.delete(url).then(
                function (response) {
                    notification.show(response.status, "Tarefa removida!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }
    };

    // -------------------------------------------------- anexos
    $scope.setAnexo = function (idprojeto) {
        var url = api.baseUrl + '/anexosprojeto';
        var formData = new FormData();
        var arquivo = document.getElementById("arquivoInput").files[0];

        formData.append("file", arquivo);
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // var div = document.getElementById('mensagem');
                // var resposta = xhr.responseText;
                // div.innerHTML += resposta;
                let anexo = {
                    'projetoId': idprojeto,
                    'descricao': arquivo.name,
                    'link': xhr.responseText.replace(/[\\"]/g, ''),
                    'data': new Date()
                };

                $http.post(url, anexo).then(
                    function (response) {
                        notification.show(response.status, "Anexo adicionado!");
                        $scope.getProjeto(idprojeto);
                        $('#modal-anexo').modal('hide');
                    },
                    function (response) {
                        notification.show(response.status, null);
                    }
                );
            }
        }

        xhr.open("POST", "http://cadweb.us-west-2.elasticbeanstalk.com/api/v1/anexosprojeto/anexo");
        xhr.send(formData);
    }

    $scope.delAnexo = function (id, idprojeto) {
        if (confirm('Tem certeza?')) {
            var url = api.baseUrl + '/anexosprojeto/' + id;

            $http.delete(url).then(
                function (response) {
                    notification.show(response.status, "Anexo removido!");
                    $scope.getProjeto(idprojeto);
                },
                function (response) {
                    notification.show(response.status, null);
                }
            );
        }
    }

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
});
