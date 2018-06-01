var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var path = require('path');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use('/static', express.static(__dirname + '/static'));
app.set('port', 3000);

app.get('/',function(req,res){
    res.render('home');
});

app.get('/sign_up',function(req,res){
    res.render('sign_up');
});

app.get('/add_people',function(req,res){
    res.render('add_people');
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});