const http = require('http');
const fs = require('fs');
let path = require('path');

let source, type;
let format = 'utf8';
let errorPath = '/error.html';

/* FUNCTION */

// will take in the route requested and output the correct file
function getRequest(response, route) {
  // handles content type
  // console.log('test', request.headers.accept);
  if (route === '/css/styles.css') type = 'text/css';
  else type = 'text/html';

  // handles navigation to main page
  if (route === '/') route = `/index.html`;

  // sets the correct route to read from
  source = path.join('public', route);

  fs.readFile(source, format, (err, data) => {
    // returns 404 page is there is a problem with reading the file
    if (err) {
      getRequest(response, errorPath);
    
    // if there is data, include a 200 and Content-Type header in the reponse header
    } else if (data) {
      response.writeHead(200, {'Content-Type' : type});

      // then write the data to the response
      response.write(data, (err) => {
        // if an error is thrown , this would be a server side error???
        if (err) throw err;
      });
        
      response.end();
    
    }
  });
}

module.exports = getRequest;