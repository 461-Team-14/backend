'use strict';

const path = require('path');
const http = require('http');

const oas3Tools = require('oas3-tools');
const cors = require('cors');
const serverPort = 8080;

// swaggerRouter configuration
const options = {
  routing: {
    controllers: path.join(__dirname, './controllers')
  }
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
}));
  
// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
