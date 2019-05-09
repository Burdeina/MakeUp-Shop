`var http = require('http');
var fs = require('fs');

var html =
<!DOCTYPE html>
<html>
<body>
<h1>Привіт</h1>
<p>Тобі відповів САМ сервер...</p>
</body>
</html>
http.createServer( function(req, res){
    console.log(req.url);
    console.log(req.method);
    if(req.url == '/' || req.url == '/index.html'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        fs.createReadStream("../static/index.html", "utf8").pipe(res);
    }else if(req.url == '/style.css'){
        res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
        fs.createReadStream("../static/style.css", "utf8").pipe(res);
    }else if(req.url == '/script.js'){
        res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
        fs.createReadStream("../static/script.js", "utf8").pipe(res);
    }else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        fs.createReadStream("../static/error404.html", "utf8").pipe(res);
    }
    }).listen(3000, '127.0.0.1');



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
})
