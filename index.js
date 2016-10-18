require("envloader").load();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var compression = require('compression');
var api = require('sat-api-lib');
var app = express();

var search = function (action, req, res) {
  var s = new api(req);
  s[action](function (err, resp) {
    if (err) {
      res.status(400).send({details: err});
    }
    res.send(resp);
  });
};

/*----------------------------------
// START MIDDLEWARES
----------------------------------*/
app.use(cors());
app.use(compression())
app.use(bodyParser.json({ type: 'application/json' })); // for parsing application/json
app.use(function(err, req, res, next) {
  console.error(err.stack);
  if (err.status === 400 && err.name === 'SyntaxError' && err.body) {
    res.status(err.status).send({details: 'Invalid JSON'})
  }

  res.status(err.status).send({details: err.body.slice(0, 100).toString()});
});
/*----------------------------------
// END MIDDLEWARES
----------------------------------*/

/*----------------------------------
// START ENDPOINTS
----------------------------------*/
app.get('/', function(req, res) {
  search('simple', req, res);
});

app.post('/', function (req, res) {
  search('simple', {query: req.body}, res);
});

app.get('/count', function(req, res) {
  search('count', req, res);
});

app.get('/geojson', function(req, res) {
  search('geojson', req, res);
});

app.post('/geojson', function(req, res) {
  search('geojson', {query: req.body}, res);
});
/*----------------------------------
// END ENDPOINTS
----------------------------------*/

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
