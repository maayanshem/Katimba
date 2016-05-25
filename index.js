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

app.get('/GetCurrPoint',function(req,res) {
  console.log("Requested point");
  res.send(JSON.stringify({a:1}));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});