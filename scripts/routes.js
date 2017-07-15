/*
* Routes module of the application.
*/
angular
.module('cadweb')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    })
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
    })
    .when('/usuario', {
        templateUrl: 'views/usuario.html',
        controller: 'UsuarioCtrl',
        controllerAs: 'usuario'
    });

    // $locationProvider.html5Mode(true);
}]);
