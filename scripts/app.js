/*
* App module of the cadweb
*/
angular
.module('cadweb', [
    'ngRoute',
])
.run(function ($rootScope, $location) {
    // inicializa as variaveis de sessao
    $rootScope.session = {
        'user': undefined,
        'logged': false,
    };

    // verificações a cada rota acessada
    $rootScope.$on('$routeChangeSuccess', function() {
        // se nao tiver logado redireciona para a pagina de login
        if (!$rootScope.session.logged && $location.path() != '/') {
            // $location.path('/login');
        }
    });

    // logout... reseta as variaveis de sessao
    $rootScope.doLogout = function () {
        $rootScope.session = {
            'user': undefined,
            'logged': false,
        };
    };
});
