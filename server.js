var http = require('http');
var fs = require('fs');
var PORT = 9090;
var PUBLIC = './public/';
var server = http.createServer(requestFunction)

server.listen(PORT,function(){
  console.log('http server listening on port:'+PORT)
})

function requestFunction(request, response){

  switch(request.method){
    case 'GET':
      functionGet(request,response);
      break;
  }
}

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
      } else{
        response.statusCode = 404;
        response.write('<h1>File does not exist!</h1>');
        response.end();
      }
    });
}