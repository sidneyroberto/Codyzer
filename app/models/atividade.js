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
            type: mongoose.Schema.ObjectId,
            ref: 'Disciplina'
        },
        linguagem: {
            type: String,
            default: 'java'
        }
    });
    
    return mongoose.model('Atividade', schema);
};
