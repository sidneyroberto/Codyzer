var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        descricao: {
            type: String,
            required: true
        },
        valor: {
            type: Number,
            required: true
        },
        deadline: {
            type: Date,
            default: Date.now
        },
        disciplina: {
            type: String,
            required: true
        },
        linguagem: {
            type: String,
            default: 'Java'
        },
        tipoTeste: {
            type: String,
            default: 'JUnit'
        },
        nomeClasseTesteJUnit: {
            type: String
        },
        nomeArquivoEntrada: {
            type: String
        },
        nomeArquivoSaida: {
            type: String
        }
    });
    
    return mongoose.model('Atividade', schema);
};
