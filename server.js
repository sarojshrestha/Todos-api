var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var todos = [
    {
        id:1,
        description:"pickup son from school",
        complete:false
    },
    {
        id:2,
        description:"go to supermarket",
        complete:false
    },
    {
        id:3,
        description:"drop at postoffice",
        complete:true
    }
    ]

app.get('/',function(req, res){
    res.send("Todo Api root");
});
// get todos
app.get('/todos', function(req, res){
    res.json(todos);
});
//get todos/:id
app.get('/todos/:id',function(req,res){
    var todosId = parseInt(req.params.id);
    var matched;
    todos.forEach(function(todo){
        if(todo.id===todosId){
            matched = todo;
        }
    });
    if(matched){    
        res.json(matched);
    }else{
        res.status(404).send();
    }
       
});


app.listen(port, function(){
    console.log("Express is running on port " + port)
});