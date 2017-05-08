const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 3001;

const edoratorSecurityService = 'http://localhost:5001'

app.listen(port, () => {
  console.log('app listening on', port);
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/*', (req, res) => {
    if(req.originalUrl.indexOf('accounts') > -1){
        debugger;
       request({
            url: edoratorSecurityService + req.originalUrl,
            method: 'POST',
            json: req.body
        }, function(error, response, body){
                res.writeHead(response.statusCode, response.rawHeaders);
                res.write(JSON.stringify(body));
                res.end();
            });
    }else{
      request({
            url: edoratorSecurityService + req.originalUrl,
            method: 'POST',
            json: req.body
            }, function(error, response, body){
                res.writeHead(response.statusCode, response.rawHeaders);
                res.write(JSON.stringify(body));
                res.end();
            });
    }
});