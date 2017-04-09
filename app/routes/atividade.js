module.exports = function(app) {
    var controller = app.controllers.atividade;
    app.route('/atividades')
        .get(controller.listaAtividades);
};
