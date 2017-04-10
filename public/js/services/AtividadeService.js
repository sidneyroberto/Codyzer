angular.module('codyzer').factory('Atividade', function($resource) {
    return $resource('/atividades/:id');
});
