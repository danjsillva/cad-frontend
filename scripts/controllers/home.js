/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('HomeCtrl', function (api, $scope, $rootScope, $http, toaster, notification) {
    $scope.discentes = [];
    $scope.docentes = [];

    $scope.getProjetos = function () {
        var url = api.baseUrl + '/projetos';

        $http.get(url).then(
            function (response) {
                $scope.projetos = response.data;
            },
            function (response) {
                notification.show(response.status);
            }
        );
    };

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

    if ($rootScope.isAuthenticated) {
        $scope.getProjetos();
        $scope.getDiscentes();
        $scope.getDocentes();

    }
});
