module.exports = function (app) {
    var controller = {};

    var Atividade = app.models.atividade;

    controller.listaAtividades = function (req, res) {
        Atividade.find().exec()
            .then(
                function (atividades) {
                    res.json(atividades);
                },
                function (erro) {
                    console.erro(erro);
                    res.status(500).json();
                }
            );
    };

    controller.salvaAtividade = function (req, res) {
        var _id = req.body._id;
        if (_id) {
            Atividade.findByIdAndUpdate(_id, req.body).exec()
                .then(
                    function (atividade) {
                        res.json(atividade);
                    },
                    function (erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        } else {
            Atividade.create(req.body)
                .then(
                    function (atividade) {
                        res.status(201).json(atividade);
                    },
                    function (erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        }
    };

    controller.obtemAtividade = function (req, res) {
        var _id = req.params.id;
        Atividade.findById(_id).exec()
            .then(
                function (atividade) {
                    if (atividade) {
                        res.json(atividade);
                    } else {
                        res.status(404).json('Atividade não encontrada');
                    }
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json();
                }
            );
    };

    controller.removeAtividade = function (req, res) {
        var _id = req.params.id;
        Atividade.remove({"_id": _id}).exec()
            .then(
                function () {
                    res.status(204).end();
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
    }


    controller.realizaUploadDeArquivoDeTeste = function (req, res) {
        fazUploadDeArquivo(req, res, 'teste');
    };

    controller.realizaUploadDeArquivoDeSubmissao = function (req, res) {
        fazUploadDeArquivo(req, res, 'submissao');
    };


    var fs = require('fs');
    var mongoose = require('mongoose');
    var Grid = require('gridfs-stream');
    var rimraf = require('rimraf');
    Grid.mongo = mongoose.mongo;

    function fazUploadDeArquivo(req, res, tipo) {
        var idAtividade = req.body.idAtividade;
        removeArquivoDeTesteExistente(idAtividade);
        var gfs = Grid(mongoose.connection.db);
        var arquivo = req.files.arquivo;

        var writeStream = gfs.createWriteStream({
            filename: arquivo.name,
            mode: 'w',
            content_type: arquivo.mimetype,
            metadata: {
                idAtividade: idAtividade,
                tipoArquivo: tipo
            }
        });

        var pastaRaiz = './uploads/';
        var pastaArquivo = pastaRaiz + idAtividade + '/';
        if (!fs.existsSync(pastaRaiz)) {
            fs.mkdirSync(pastaRaiz);
        }
        if (!fs.existsSync(pastaArquivo)) {
            fs.mkdirSync(pastaArquivo);
        }
        var caminhoArquivo = pastaArquivo + arquivo.name;
        fs.writeFile(caminhoArquivo, arquivo.data, function (erro) {
            if (erro) {
                console.log('Deu erro aqui: ' + erro);
            } else {
                console.log("Arquivo '" + arquivo.name + "' salvo em " + caminhoArquivo + ".");
            }

        });

        writeStream.on('close', function (arquivo) {
            console.log('Arquivo salvo com sucesso!');
            res.send('Arquivo salvo com sucesso');
            rimraf(pastaArquivo, function () {
                console.log('Pasta ' + pastaArquivo + ' removida.')
            });
        });

        fs.createReadStream(caminhoArquivo).pipe(writeStream);
    }

    controller.fazDownloadDoArquivoDeTeste = function (req, res) {
        var idAtividade = req.params.id;
        console.log('idAtividade: ' + idAtividade);
        var gfs = Grid(mongoose.connection.db);
        gfs.findOne({metadata: {idAtividade: idAtividade, tipoArquivo: 'teste'}}, function (erro, arquivo) {
            if (erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else {
                if (arquivo) {
                    res.setHeader('Content-type', arquivo.contentType);
                    res.setHeader('Content-disposition', 'attachment; filename=' + arquivo.filename);

                    gfs.createReadStream({"_id": arquivo._id}).pipe(res);
                } else {
                    res.status(404).json('Arquivo não encontrado');
                }
            }
        });
    }

    function removeArquivoDeTesteExistente(idAtividade) {
        var gfs = Grid(mongoose.connection.db);
        var filtroConsulta = {metadata: {idAtividade: idAtividade, tipoArquivo: 'teste'}};
        console.log(filtroConsulta);
        gfs.files.find(filtroConsulta, function (erro, arquivos) {
            if (erro) {
                console.log(erro);
                res.status(500).json(erro);
            } else if (arquivos) {
                arquivos.forEach(function (arquivo) {
                    console.log('Arquivo: ' + arquivo);
                    if (arquivo) {
                        gfs.remove({_id: arquivo._id}, function (erro) {
                            if (erro) {
                                console.log(erro);
                                res.status(500).json(erro);
                            }
                            console.log('Arquivo de teste da atividade de _id ' + idAtividade + ' removido.');
                        });
                    }
                });
            }
        });

    }

    return controller;
};





















