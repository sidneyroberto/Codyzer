angular.module('codyzer').controller('AtividadeController', 
    function($scope, $routeParams, Atividade, Upload) {
        if($routeParams.atividadeId) {
			Atividade.get({id: $routeParams.atividadeId},
				function(atividade) {
					$scope.atividade = atividade;
                    $scope.atividade.deadline = new Date(atividade.deadline)
				},
				function(erro) {
					console.log(erro);
					$scope.mensagem = {texto : "Atividade inexistente. Atividade nova.", sucesso : false};
					$scope.atividade = new Atividade();
				}
			);
		} else {
			$scope.atividade = new Atividade();
		}
        
        $scope.salva = function() {
            if($scope.arquivo) {
                $scope.atividade.$save()
                    .then(
                        function(atividade) {
                            fazUploadDoArquivoDeTeste(atividade._id);
                            $scope.mensagem = {texto : "Atividade salva com sucesso!", sucesso : true};
                            $scope.atividade = new Atividade();
                        },
                        function(erro) {
                            console.log(erro);
                            $scope.mensagem = {texto : "Não foi possível salvar a atividade.", sucesso : false};
                        }
                    );
            } else {
                $scope.mensagem = {texto : "Envie o arquivo de teste!", sucesso : false};
                document.getElementById('botao_arquivo').focus();
            }
        };
    
        function fazUploadDoArquivoDeTeste(atividadeId) {
            $scope.arquivo.upload = Upload.upload({
                url: '/upload/teste',
                data: {arquivo: $scope.arquivo, idAtividade: atividadeId}
            });
            
            $scope.arquivo.upload.then(
                function(resposta) {
                    console.log(resposta);
                },
                function(resposta) {
                    if(resposta.status > 0) {
                        $scope.mensagem = {texto : "Ocorreu um erro ao tentar fazer upload do arquivo de teste.", sucesso : false};
                    }
                }
            );
        }
    }
);














