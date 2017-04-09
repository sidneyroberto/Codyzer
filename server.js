var http = require('http');
var app = require('./config/express.js')();
require('./config/database.js')('mongodb://localhost/codyzer');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server ouvindo na porta ' + app.get('port'));
}); 
