angular.module('codyzer').controller('AtividadesController',
    function($scope, $window, Atividade) {
        $scope.atividades = [];
		$scope.filtro = '';
		$scope.mensagem = {};
		
		function buscaAtividades() {
			Atividade.query(
				function(atividades) {
					$scope.atividades = atividades;
					$scope.mensagem = {};
				},
				function(erro) {
					console.log(erro);
					$scope.mensagem = {texto : 'Não foi possível recuperar a lista de atividades'};
				}
			);
		}
		buscaAtividades();
		
		$scope.remove = function(atividade) {
			if($window.confirm("Deseja realmente remover esta atividade?")) {
				Atividade.delete(
					{id: atividade._id},
					function(erro) {
						console.log(erro);
						$scope.mensagem = {texto: 'Não foi possível remover a atividade'};
					}
				);
			}
		};
	}
);