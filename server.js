var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/',function(req, res){
    res.send("Todo Api root");
});

app.listen(port, function(){
    console.log("Express is running on port " + port)
});