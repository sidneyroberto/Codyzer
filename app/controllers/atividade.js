module.exports = function(app) {
    var controller ={};
    
    var Atividade = app.models.atividade;
    
    controller.listaAtividades = function(req, res) {
        Atividade.find().exec()
            .then(
                function(atividades) {
                    res.json(atividades);
                },
                function(erro) {
                    console.erro(erro);
                    res.status(500).json();
                }
            );
    };
    
    controller.salvaAtividade = function(req, res) {
        var _id = req.body._id;
        if(_id) {
            Atividade.findByIdAndUpdate(_id, req.body).exec()
                .then(
                    function(atividade) {
                        res.json(atividade);
                    },
                    function(erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        } else {
            Avaliacao.create(req.body)
                .then(
                    function(atividade) {
                        res.status(201).json(atividade);
                    },
                    function(erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        }
    };
    
    controller.obtemAtividade = function(req, res) {
        var _id = req.params.id;
        Atividade.findById(_id).exec()
            .then(
                function(atividade) {
                    if(atividade) {
                        res.json(atividade);    
                    } else {
                        res.status(404).json('Atividade não encontrada');    
                    }
                },
                function(erro) {
                    console.error(erro);
                    res.status(500).json();
                }
            );
    };
    
    controller.removeAtividade = function(req, res) {
        var _id = req.params.id;
        Atividade.remove({"_id" : _id}).exec()
            .then(
                function() {
                    res.status(204).end();
                },
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
    }
    
    return controller;
};





















