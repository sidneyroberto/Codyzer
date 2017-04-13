angular.module('codyzer').factory('DownloadTeste', function($resource) {
    return $resource('/download/teste/:id');
});
