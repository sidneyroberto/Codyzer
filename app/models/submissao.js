var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        dataHorario: {
            type: Date,
            default: Date.now
        },
        atividade: {
            type: mongoose.Schema.ObjectId,
            ref: 'Atividade'
        }
    });
    
    return mongoose.model('Submissao', schema);
};
