var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/app", express.static(path.join(__dirname, '/app')));
app.use("/styles", express.static(path.join(__dirname, '/styles')));
app.use("/node_modules", express.static(path.join(__dirname, '/node_modules')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
})

var port = 4567;
app.listen(port);

console.log('Server now listening on port ' + port);