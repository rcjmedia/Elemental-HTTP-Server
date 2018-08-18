var http = require('http');
var fs = require('fs');
var PORT = 9090;
var PUBLIC = './public/';
var notfound = './public/404.html';
var server = http.createServer(requestFunction)

///GET function
function functionGet(request,response){
  var uri = request.url;
    if(uri === '/'){
      uri = 'index.html';
    }

    fs.exists(PUBLIC + uri, function(exists){
      if(exists){
        fs.readFile(PUBLIC + uri,function(err,data){
          if(err){
            throw err;
          }
          response.write(data);
          response.end();
        })
      } else { //read the 404.html file if page not found
        fs.readFile(notfound, 'utf8', (err, data) => {
          response.writeHead(404);
          response.write(data);
          response.end();
        })
      }
    });
}

///Helper func for GET
function requestFunction(request, response){
  switch(request.method){
    case 'GET':
      functionGet(request,response);
      break;
  }
}

server.listen(PORT,function(){
  console.log('http server listening on port:'+PORT)
})