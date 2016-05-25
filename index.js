var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var favicon = require("serve-favicon");
var currPoint = JSON.parse('{ "Right" : 1}');


app.use(bodyParser.json());
app.use(favicon("icon.ico"));
app.get('/test', function (req, res) {
    res.send('Hello World!');
});



app.get('/',function(req,res){
  res.sendfile('client/index.html');
});


app.get('/home',function(req,res){
  res.sendfile('client/index.html');
});

app.post('/AddPoint', function (req, res) {
  console.log(req.body);
 currPoint = req.body;
      res.sendstatus(200);
});

app.get('/GetCurrPoint',function(req,res) {
  console.log("Requested point");
res.send(JSON.stringify(currPoint));
});

app.use("/", express.static(path.join(__dirname, '/Client')));

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});