var express = require('express');
const bodyParser = require("body-parser");

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var path = require('path');
app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'handlebars');
app.use('/static', express.static(__dirname + '/static'));
app.set('port', process.argv[2]);


app.get('/',function(req,res){
    res.render('landing');
});

app.get('/sign_up',function(req,res){
    res.render('sign_up');
});

app.post("/sign_up", function (req, res) {
    console.log(req.body);
    // TODO submit the req.body data to the User database
    res.redirect("/home");
});

app.get('/home',function(req,res){
    res.render('home');
});

app.get('/add_people',function(req,res){
    res.render('add_people');
});


app.post("/add_people", function (req, res) {
    console.log(req.body);
    // TODO submit the req.body data to the User database
    res.redirect("/home");
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