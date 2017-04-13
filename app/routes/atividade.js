module.exports = function(app) {
    var controller = app.controllers.atividade;
    app.route('/atividades')
        .get(controller.listaAtividades)
        .post(controller.salvaAtividade);
    app.route('/atividades/:id')
        .get(controller.obtemAtividade)
        .delete(controller.removeAtividade);
    app.route('/upload/teste')
        .post(controller.realizaUploadDeArquivoDeTeste);
    app.route('/upload/submissao')
        .post(controller.realizaUploadDeArquivoDeSubmissao);
    app.route('/download/teste/:id')
        .get(controller.fazDownloadDoArquivoDeTeste);
};
