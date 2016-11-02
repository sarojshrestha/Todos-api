var express = require('express');
var bodyParser = require('body-parser');
var _ =require('underscore');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
/*
var todos = [
    {        id:1,
        description:"pickup son from school",
        complete:false
    },    {
        id:2,
        description:"go to supermarket",
        complete:false
    },    {
        id:3,
        description:"drop at postoffice",
        complete:true
    }
    ];
*/
var todos=[];
var todoId = 1;
app.get('/',function(req, res){
    res.send("Todo Api root");
});


// GET todos?complete=true
app.get('/todos', function(req, res){
    var queryParams =  req.query;
    var filteredTodos = todos;
    if(queryParams.hasOwnProperty('complete') && queryParams.complete=='true')
    {
        filteredTodos = _.where(todos,{complete:true});
    }else if(queryParams.hasOwnProperty('complete') && queryParams.complete=='false'){
        filteredTodos = _.where(todos,{complete:false});
    }
    if(queryParams.hasOwnProperty('description')){
        debugger
       filteredTodos = _.filter(filteredTodos,function(query){
           console.log(queryParams.description);
            return query.description.indexOf(queryParams.description) > -1;
    });
    }

    //console.log(filteredTodos);
    res.json(filteredTodos);
});
//get todos/:id
app.get('/todos/:id',function(req,res){
    var todosId = parseInt(req.params.id);
    var matched;
    matched = _.findWhere(todos,{id:todosId});
    /*todos.forEach(function(todo){
        if(todo.id===todosId){
            matched = todo;
        }
    });*/
    if(matched){    
        res.json(matched);
    }else{
        res.status(404).send("can not find");
    }
});

//POST Todos
app.post('/todos',function(req, res){
var bodyText = _.pick(req.body,'complete','description');
if(!_.isBoolean(bodyText.complete) || !_.isString(bodyText.description) || bodyText.description.trim().length ===0)
{
    return res.status(400).send();
}
bodyText.description = bodyText.description.trim();

bodyText.id = todoId++;
todos.push(bodyText);
res.json(todos);
});

//Delete /todos:id
app.delete('/todos/:id',function(req, res){
    
    var todoId = parseInt(req.params.id);
    var matched = _.findWhere(todos,{id:todoId});
    console.log('Deleting ' + matched);
    if(!matched){
        res.status(404).json({"error":"no id found"});
    }else{
           todos = _.without(todos,matched);
             console.log('deleted ' + matched);
   res.json(todos);
    }
});

//PUT /todos/:id
app.put('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id);
    var matched = _.findWhere(todos,{id:todoId});
    if(!matched){
        return res.status(404).send();
    }
        var bodyText = _.pick(req.body,'description','complete');
        var modifyBodyText = {};
   
        if(bodyText.hasOwnProperty('description') && _.isString(bodyText.description) && bodyText.description.length > 0 ){
        modifyBodyText.description = bodyText.description.trim();
        }
        if(bodyText.hasOwnProperty('complete') && _.isBoolean(bodyText.complete)){
        modifyBodyText.complete=bodyText.complete;
        }

        console.log(modifyBodyText);
        _.extend(matched,modifyBodyText);
        res.json(todos);
    
});

app.listen(port, function(){
    console.log("Express is running on port " + port)
});