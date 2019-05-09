var http = require('http');
var fs = require('fs');
var express = require('express');

var app=express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get('/static/css/style.css', function(req, res) {
    res.sendFile(__dirname + "/style.css");
});

app.get('/static/scripts/script.js', function(req, res) {
    res.sendFile(__dirname + "/script.js");
});
app.get('/:id', function(req, res) {
    res.send("id: " + req.params.id);
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
