var express = require('express');
var mysql = require('./dbcon.js');
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
app.set('mysql', mysql);


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

app.get('/search_airfare',function(req,res){
    res.render('search_airfare');
});

app.get('/search_trainfare',function(req,res){
    res.render('search_trainfare');
});

app.get('/user_preferences',function(req,res){
    res.render('user_preferences');
});

app.get('/stamp_locations',function(req,res){
    var context = {};
    mysql.pool.query("SELECT * FROM stamps", function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else {
            context.stamps = results;
            res.render('stamp_locations', context);
        }
    });
});

app.get('/stamp_history',function(req,res){
    var context = {};
    mysql.pool.query("SELECT * FROM stamps WHERE visited = TRUE", function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else {
            context.stamps = results;
            res.render('stamp_history', context);
        }
    });
});

app.get('/stamp_itinerary',function(req,res){
    var context = {};
    mysql.pool.query("SELECT * FROM stamps WHERE in_itinerary = TRUE", function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else {
            context.stamps = results;
            res.render('stamp_itinerary', context);
        }
    });
});

app.put('/edit_stamp/', function (req, res) {

    var sql = "UPDATE stamps SET visited=?, user_comments=?, rating=? WHERE id=?";
    var inserts = [req.body.visited, req.body.user_comments, req.body.rating, req.body.id];
    mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.end();
        }
    });
});

app.put('/remove_stamp_itinerary/:id', function (req, res) {

    var sql = "UPDATE stamps SET in_itinerary=0 WHERE id=?";
    var inserts = [req.params.id];
    mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.end();
        }
    });
});

app.put('/add_stamp_itinerary/:id', function (req, res) {

    var sql = "UPDATE stamps SET in_itinerary=1 WHERE id=?";
    var inserts = [req.params.id];
    mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.end();
        }
    });
});

app.get('/stamp_edit/:id',function(req,res){
    var context = {};
    var sql = "SELECT * FROM stamps WHERE id = ?";
    var inserts = [req.params.id];
    mysql.pool.query(sql, inserts, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        } else {
            context.stamp = results[0];
            res.render('stamp_edit', context);
        }
    });
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