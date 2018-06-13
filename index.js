var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var environment = app.get('env');
var session = require('express-session');
var favicon = require('serve-favicon');

var port = process.env.PORT || 8009;

app.use(favicon(__dirname + '/favicon.ico'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
    secret: 'xzcdfswdjgdwjhdwhg', // Could be any value, i just had scribbled my keyboard
    resave: true,
    saveUninitialized: false
}));

app.use('/learn-express', function(req, res, next){
    next();
}, require('./routes.js'));

app.listen(port, function() {
   console.log("App running on port", port);
});


