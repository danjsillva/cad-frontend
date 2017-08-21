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
    })
    .when('/discente', {
        templateUrl: 'views/discente.html',
        controller: 'DiscenteCtrl',
        controllerAs: 'discente'
    })
    .when('/setor', {
        templateUrl: 'views/setor.html',
        controller: 'SetorCtrl',
        controllerAs: 'setor'
    })
    .when('/pesquisa', {
        templateUrl: 'views/pesquisa.html',
        controller: 'PesquisaCtrl',
        controllerAs: 'pesquisa'
    });

    // $locationProvider.html5Mode(true);
});
