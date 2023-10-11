const express = require('express');
const app = express();

//app is used to mount middle ware
//use takes 1 arg the middleware you want to run



app.use(express.static('../Front-End'))
//you can use multiple express.statics
//so just an idea you might be able to use this for ur 
//js...mongoDB..etc to help you with ur project

//BE WARY OF USING EXPRESS.STATIC AS ANYONE CAN SEE YO FILES
// ESPECIALLY W DATABASES. you don't want data leaks lol

app.listen(3000);
console.log("Server listening on port 3000")