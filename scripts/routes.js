/*
* Routes module of the application.
*/
angular
.module('cadweb')
.config(function(api, $routeProvider, $locationProvider, $authProvider) {
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
    })
    .when('/docente', {
        templateUrl: 'views/docente.html',
        controller: 'DocenteCtrl',
        controllerAs: 'docente'
    });

    // $locationProvider.html5Mode(true);
});
