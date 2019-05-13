var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var path = require('path');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var config = require('./config/database');

mongoose.connect(config.database);
var db = mongoose.connection;


db.once('open', function(){
    console.log("DB connected");
});
db.on('error', function(err){
    console.log(err);
});


var app = express();

//init mongo
// var mc = mongo.MongoClient;
// var mongourl = "mongodb://localhost:27017/";

var Product = require('./models/product');



app.use(bodyParser.urlencoded({ extended: false }))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('static'));


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));


app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


  require('./config/passport')(passport);
  app.use(passport.initialize());
  app.use(passport.session());


app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });

app.get('/', function(req, res) {
    var query = { pageid: 1 };
    Product.find(query, function(err, products){
        if(err){
            console.log(err);
        } else {
            res.render("index", {
                title: "Home",
                products: products,
                pageid: 1
            });
        }
    });
});

//Todo: add titles to other pages(prdct, lgn...)
app.get('/index', function(req, res) {
    var query = { pageid: 1 };
    Product.find(query, function(err, products){
        if(err){
            console.log(err);
        } else {
            res.render("index", {
                title: "Home",
                products: products,
                pageid: 1
            });
        }
    });
});

app.get('/index/:pageid', function(req, res) {
    var query = { pageid: req.params.pageid };
    Product.find(query, function(err, products){
        if(err){
            console.log(err);
        } else {
            res.render("index", {
                title: "Home",
                products: products,
                pageid: req.params.pageid
            });
        }
    });
});

var products = require('./routes/products');
var users = require('./routes/users');
app.use('/users', users);
app.use('/products', products);


app.get('/error404', function(req, res) {
    res.render("error404", {
        title: "Error 404"
    });
});

//to do: image get template
app.get('/images/HTML-404-Error-Page.gif', function(req, res) {
});





app.get('/css/style.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/css/footer.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/css/product.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/css/buttons.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/scripts/errorMenuScript.js', function(req, res) {
    // if (1) then...
});

app.get('/scripts/menuScript.js', function(req, res) {
    // if (1) then...
    //res.sendFile(__dirname + "/menuScript.js");
});

app.get('/scripts/delete.js', function(req, res) {
});

app.get('/scripts/index_view.js', function(req, res) {
});

app.get('/bower_components/jquery/dist/jquery.js', function(req, res) { });
app.get('/bower_components/bootstrap/dist/css/bootstrap.js', function(req, res) { });

app.listen(3000);
