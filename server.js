var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));

// (1)
// !!! app.use('/static', express.static('static'));
// !!! 1 static url starts with /static
// !!! 2 static local folder name static/..
// if more folders us this!!!


app.get('/', function(req, res) {
  res.render("index");
});
app.get('/index', function(req, res) {
    res.render("index");
});

app.get('/error404', function(req, res) {
    res.render("error404");
});
app.get('/css/style.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/product/:id', function(req, res) {
    var obj = {name: "lipstick", count: "7", producer: ["maybellen", "diva", "loreal","doir"]};
    res.render('product', {productId: req.params.id, obj: obj});
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
