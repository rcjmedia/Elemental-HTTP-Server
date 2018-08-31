var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var PORT = 80;
var PUBLIC = './public/';
var notfound = './public/404.html';
var server = http.createServer(requestFunction)
var postSuccessful = '{"success":"true"}';


///GET function
function functionGet(request,response){
  var uri = request.url;
    if(uri === '/'){
      uri = 'index.html';
    }

    fs.exists(PUBLIC + uri, function(exists){
      if(exists){
        fs.readFile(PUBLIC + uri,function(err,data) {
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


/////POST function
function functionPost(request,response){
  var postBody = '';
  request.on('data', function(chunk){
  postBody += chunk.toString();
  // response.end();
  })
  request.on('end', function(){
    var postObject = querystring.parse(postBody);
    var pageContent = generateElementHtmlPage(postObject.elementName,postObject.elementSymbol,postObject.elementAtomicNumber,postObject.elementDescription);
    var fileName = PUBLIC+postObject.elementName.toLowerCase() +'.html';
    //check if file exists
      fs.exists(fileName,function(fileAlreadyExists){
        if (fileAlreadyExists){
        //if file exists respond unsucessful
        response.write(postUnsuccessful);
        response.end();
        } else{
        // otherwise create a new file, in public and respond success
          fs.writeFile(fileName,pageContent,function(err){
            if(err){
            response.write(err);
            response.end();
            throw err;
            } else{
            response.write(postSuccessful);
            response.end();
            updateIndexPage(fileName,postObject.elementName)
            }
          })
        }
      })
  })
  }

////////Helper func for GET, POST////////
function requestFunction(request, response){
  switch(request.method){
    case 'GET':
      functionGet(request,response);
      break;
    case 'POST':
      functionPost(request,response);
      break;  
  }
}

server.listen(PORT,function(){
  console.log('HTTP server listening on port: '+PORT)
})