/*
* Notification module of the cadweb
*/
angular
.module('cadweb')
.service('notification', function (toaster) {
    this.show = function (status, message) {
        switch (true) {
            case ((200 <= status <= 299) && (message != null)):
                toaster.pop('success', "Sucesso!", message);
                break;
            case (status == 400):
                toaster.pop('error', "Erro [Status: " + status + "]", "Erro de cliente. Requisição inválida.");
                break;
            case (status == 401):
                toaster.pop('error', "Erro [Status: " + status + "]", "Erro de cliente. Não autorizado.");
                break;
            case (status == 500):
                toaster.pop('error', "Erro [Status: " + status + "]", "Erro interno do servidor (Internal Server Error).");
                break;
            default:
                toaster.pop('error', "Erro [Status: " + status + "]", "Não foi possível atender a esta solicitação.");
        }
    }
});
