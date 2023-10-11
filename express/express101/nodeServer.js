/*
    This expirement was just to feel grateful we have
    web frameworks like express that deals with this crappy stuff
    Thank god we don't have to do so much work because
    we have stuff like express

*/


const http = require('http');
const fs = require('fs');
//fs gives node access to this  comp file system


const server = http.createServer((req, res) => {
    console.log(`A request was made to ${req.url}`);
    if(req.url === "/"){
    //res = our way of responding to our requester
    //http message
    // 1. start-line node takees care of this
    // 2. header
    // 3. body
    //
    /* 1. write head takes 2 args
        2. status code
        3. obj   */
        
        

        res.writeHead(200, {'content-type':'text/html'}); //writes head
        const homePageHTML = fs.readFileSync('../Front-End/index.html');
        res.write(homePageHTML);
    }
    else if(req.url === "/style.css"){
        res.writeHead(200, {'content-type':'text/css'}); //writes head
        const css = fs.readFileSync('../Front-End/style.css');
        res.write(css);
    }
    else{
        res.write(`Sorry, this isn't the page you're looking for`) //writes body
    }
    res.end();
});


server.listen(3000); //listens to http traffic
                     // if listens for http it will create a server
