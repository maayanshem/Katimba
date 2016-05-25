var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var favicon = require("serve-favicon");

app.use(bodyParser.json());
app.use(favicon("icon.ico"));
app.get('/test', function (req, res) {
    res.send('Hello World!');
});


app.post('/AddPoint', function (req, res) {
  console.log(req.body);
});

var obj = {'Name':'ID'};
console.log(JSON.stringify(obj))

app.listen(8080, function () {
  console.log('app listening on port 8080!');
});