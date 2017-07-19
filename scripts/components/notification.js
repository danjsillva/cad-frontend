/*
* Notification module of the cadweb
*/
angular
.module('cadweb')
.service('notification', function (toaster) {
    this.show = function (status) {
        switch (status) {
            case 200:
                toaster.pop('success', "Sucesso!", "Operação realizada.");
                break;
            case 400:
                toaster.pop('error', "Erro [Status: " + status + "]", "Erro de cliente. Requisição inválida.");
                break;
            case 401:
                toaster.pop('error', "Erro [Status: " + status + "]", "Erro de cliente. Não autorizado.");
                break;
            case 500:
                toaster.pop('error', "Erro [Status: " + status + "]", "Erro interno do servidor (Internal Server Error).");
                break;
            default:
                toaster.pop('error', "Erro [Status: " + status + "]", "Não foi possível atender a esta solicitação.");
        }
    }
});
