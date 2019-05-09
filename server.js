var http = require('http');

var html = `
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
