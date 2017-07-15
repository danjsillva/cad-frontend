/*
* Controller of the cadweb
*/
angular
.module('cadweb')
.controller('UsuarioCtrl', function ($scope) {
    $scope.users = [];
    $scope.user = {
        'id': 1,
        'name_f': 'Administrador',
        'name_l': 'do Sistema',
        'login': 'admin',
        'email': 'admin@cad.com',
    };

    $scope.doSave = function (user) {
        $scope.users.push(user);

        $('#modal-usuario').modal('close');
        $scope.user = {};
    };
    $scope.doSave($scope.user);

    $scope.doNew = function () {
        $scope.user = {};
        $('#modal-usuario').modal('open');
    };

    $scope.doEdit = function (user) {
        $scope.user = user;
        $('#modal-usuario').modal('open');
    };

    $scope.doDelete = function (user) {
        index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);

        $('#modal-usuario').modal('close');
        $scope.user = {};
    };

    $scope.doCancel = function () {
        $('#modal-usuario').modal('close');
        $scope.user = {};
    };
});
