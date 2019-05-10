var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var path = require('path');
var mongoose = require('mongoose');

//init mongoose
mongoose.connect('mongodb://localhost:webstore');
var db = mongoose.connection;

var app = express();
var mc = mongo.MongoClient;
var mongourl = "mongodb://localhost:27017/";

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('static'));

// (1)
// !!! app.use('/static', express.static('static'));
// !!! 1 static url starts with /static
// !!! 2 static local folder name static/..
// if more folders us this!!!


app.get('/', function(req, res) {
  var products = [
        {
          id: 1,
          name: 'Lipstick',
          producer: 'Dior',
          volume: '12 ml',
          classification: 'Elite',
          made_in: 'France',
      },
      {
          id: 2,
          name: 'Lipstick',
          producer: 'Chanell',
          volume: '12 ml',
          classification: 'Elite',
          made_in: 'France',
      },
      {
          id: 3,
          name: 'Powder',
          producer: 'Loreal',
          volume: '50 gr',
          classification: 'Mass Market',
          made_in: 'France',
      },
      {
          id: 4,
          name: 'Lipstick',
          producer: 'NYX',
          volume: '18 ml',
          classification: 'Middle Market',
          made_in: 'USA',
      }
    ];
    res.render("index", {
        products: products
    });
});
app.get('/index', function(req, res) {
  var products = [
      {
          id: 1,
          name: 'Lipstick',
          producer: 'Dior',
          volume: '12 ml',
          classification: 'Elite',
          made_in: 'France',
      },
      {
          id: 2,
          name: 'Lipstick',
          producer: 'Chanell',
          volume: '12 ml',
          classification: 'Elite',
          made_in: 'France',
      },
      {
          id: 3,
          name: 'Powder',
          producer: 'Loreal',
          volume: '50 gr',
          classification: 'Mass Market',
          made_in: 'France',
      },
      {
          id: 4,
          name: 'Lipstick',
          producer: 'NYX',
          volume: '18 ml',
          classification: 'Middle Market',
          made_in: 'USA',
      }
  ];
  res.render("index", {
      products: products
  });
});

app.get('/error404', function(req, res) {
    res.render("error404");
});

app.get('/login', function(req, res) {
    res.render("login");
});

app.get('/temp', function(req, res) {
    res.render("temp");
});

app.post('/login', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    res.render("login_success", {data: req.body});
});
app.get('/images/HTML-404-Error-Page.gif', function(req, res) {
});

app.get('/images/dior_lip_maximazer.jpg', function(req, res) {
});


app.get('/css/style.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/product/:id', function(req, res) {
  var obj;
var id = req.params.id;
mc.connect(mongourl, { useNewUrlParser: true }, function(err, db) {
   if (err) throw err;
   var dbo = db.db("webstore");
   var query = { _id: id };
   dbo.collection("products").findOne({}, function(err, result) {
       if (err) throw err;
       console.log(result);
       obj = {name: result.name, producer: result.producer};
       console.log(obj);
       res.render('product', {productId: id, obj: obj});
       db.close();
   });
});
console.log(id);
});
app.get('/scripts/errorMenuScript.js', function(req, res) {
    // if (1) then...
});

app.get('/scripts/menuScript.js', function(req, res) {
    // if (1) then...
    //res.sendFile(__dirname + "/menuScript.js");
});
app.listen(3000);

`

const express=require('express');
const path=require('path');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;
//Check connection
db.once('open',function(){
  console.log('Connected to MongoDB');
})

//Check for DB errors
db.on('error',function(err){
  console.log(err);
});
const app=express();

let Article=require('./models/article');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.get('/',function(req,res){
  Article.find({},function(err,articles){
    if(err){
      console.log(err);
    }else{
      res.render("index",{
        title:'Articles'
        articles:articles
      });
    }


  });
});
app.get('/articles/add',function(req,res){
  res.render('add_article',{
    title:'Add article'
  });
});
app.listen(3000,function(){
  console.log('Server started^^');
})`
