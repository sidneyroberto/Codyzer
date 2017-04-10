angular.module('codyzer', ['ngRoute', 'ngResource', 'ngFileUpload'])
    .config(function($routeProvider) {
        $routeProvider.when('/atividades', {
            templateUrl: 'partials/atividades.html',
            controller: 'AtividadesController'
        });
    
        $routeProvider.when('/atividade', {
            templateUrl: 'partials/atividade.html',
            controller: 'AtividadeController'
        });
    
        $routeProvider.when('/atividade/:atividadeId', {
            templateUrl: 'partials/atividade.html',
            controller: 'AtividadeController'
        });    
    
        $routeProvider.otherwise({redirectTo: '/atividades'});
    }
);
