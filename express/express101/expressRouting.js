const express = require('express');
const app = express();

//app object has a few methoods:
/*

HTTP verbs and REST verbs
    1. get - reader
    2. post - create
    3. delete - delete
    4.put - update
    5. all accepts any method/verb


    //take 2 args:
    1. path
    2. callback to run if an HTTP request that 
    matchs this verb is made to the path #1

    app.get
    app.post
    app.delete
    app.put


*/


    app.all('/', (req,res=>{
        res.send('<h1> Welcome to the home page! <h1>')
    }))
    app.get('/', (req,res=>{

    }))
    app.post('/', (req,res=>{

    }))
    app.delete('/', (req,res=>{

    }))
    app.put('/', (req,res=>{

    }))

app.listen(3000);

console.log("The server is listening on port 3000...");