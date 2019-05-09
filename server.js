var http = require('http');

var html =`
<!DOCTYPE html>
<html>
<body>
<h1>Привіт</h1>
<p>Тобі відповів САМ сервер...</p>
</body>
</html>`

http.createServer( function(req, res){
    console.log(req.url);
    console.log(req.method);
    switch(req.url){
        case '/':
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(html);

        default:
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Error 404');
    }
    //console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
}).listen(3000, '127.0.0.1');



`

const express=require('express');
const path=require('path');
const app=express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.get('/',function(req,res){
  res.render("index",{
    title:'Hello'
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
`
