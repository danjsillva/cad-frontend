/*
* App module of the cadweb
*/

// url base do dominio do backend
var domainUrl = 'http://cadweb.us-west-2.elasticbeanstalk.com';

angular
.module('cadweb', [
    'ngRoute',
    'satellizer',
    'ui.bootstrap',
    'toaster',
    'ng.httpLoader',
])
.constant('api', {
    baseUrl: domainUrl + '/api/v1',
    loginUrl: domainUrl + '/api/v1/security/token'
})
.run(function ($rootScope, $location, $auth) {
    // verificações a cada rota acessada
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.isAuthenticated = $auth.isAuthenticated();

        // se nao tiver logado redireciona para a pagina de login
        if (!$rootScope.isAuthenticated && $location.path() != '/') {
            $location.path('/login');
        }
    });

    // logout...
    $rootScope.doLogout = function () {
        $auth.logout();
    };
})
.config(function (httpMethodInterceptorProvider) {
    httpMethodInterceptorProvider.whitelistDomain(domainUrl);
});
